import { showPopup } from "./showPopup";

console.log("Content script ativo");

// 🔹 debounce helper
function debounce(fn: Function, delay: number) {
  let timeout: number;

  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// 🔹 evita repetir a mesma palavra
let lastSelected = "";

// 🔹 handler com debounce
const handleSelection = debounce(() => {
  const text = window.getSelection()?.toString().trim();

  if (text && text !== lastSelected) {
    lastSelected = text;

    console.log("Selecionado:", text);

    try {
      chrome.runtime.sendMessage({ word: text });
    } catch {
      console.log("Extensão recarregada");
    }
  }
}, 400);

// 🔹 escuta seleção do mouse
document.addEventListener("mouseup", handleSelection);

// 🔹 recebe evento do botão direito
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "DEFINE") {
    console.log("CHEGOU DEFINE:", msg.word);
    showPopup(msg.word);
  }
});