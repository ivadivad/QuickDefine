import { showPopup } from "./showPopup";

console.log("Content script ativo");

// 🔹 debounce helper tipado
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeout: number;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => fn(...args), delay);
  };
}

// 🔹 evita repetir a mesma palavra
let lastSelected = "";
let isAlive = true;

const handleSelection = debounce(() => {
  if (!isAlive) return;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const text = selection.toString().trim();
  if (!text || text === lastSelected) return;

  lastSelected = text;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const position = {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY
  };

  try {
    if (!chrome.runtime?.id) throw new Error();

    chrome.runtime.sendMessage({
      word: text,
      position
    });
  } catch {
    console.log("Extensão inválida → parando listener");

    isAlive = false;
    document.removeEventListener("mouseup", handleSelection);
  }

}, 400);

// 🔹 escuta seleção do mouse
document.addEventListener("mouseup", handleSelection);

// 🔹 recebe evento do botão direito
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "DEFINE") {
    showPopup(msg.word, msg.position);
  }
});