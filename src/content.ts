import { showPopup } from "./showPopup";

console.log("Content script ativo");

// Função debounce para evitar execuções excessivas em sequência
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeout: number;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout); // limpa execução anterior
    timeout = window.setTimeout(() => fn(...args), delay); // agenda nova execução
  };
}

// Armazena a última palavra selecionada para evitar repetições
let lastSelected = "";

// Controla se a extensão ainda está ativa
let isAlive = true;

// Função principal que trata a seleção de texto (com debounce)
const handleSelection = debounce(() => {
  // Se a extensão foi invalidada, não executa mais nada
  if (!isAlive) return;

  const selection = window.getSelection();

  // Garante que existe seleção válida
  if (!selection || selection.rangeCount === 0) return;

  const text = selection.toString().trim();

  // Evita chamadas desnecessárias (texto vazio ou repetido)
  if (!text || text === lastSelected) return;

  lastSelected = text;

  // Obtém a posição da seleção na tela
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const position = {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY
  };

  try {
    // Verifica se o contexto da extensão ainda é válido
    if (!chrome.runtime?.id) throw new Error();

    // Envia a palavra e posição para o background
    chrome.runtime.sendMessage({
      word: text,
      position
    });
  } catch {
    // Caso a extensão tenha sido recarregada/invalida, interrompe o listener
    console.log("Extensão inválida → parando listener");

    isAlive = false;
    document.removeEventListener("mouseup", handleSelection);
  }

}, 400);

// Escuta evento de seleção de texto com o mouse
document.addEventListener("mouseup", handleSelection);

// Listener para mensagens vindas do background (ex: clique no botão direito)
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "DEFINE") {
    // Exibe o popup na posição recebida
    showPopup(msg.word, msg.position);
  }
});