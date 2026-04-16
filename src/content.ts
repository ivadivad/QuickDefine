import { showPopup } from "./showPopup";

console.log("Content script ativo");

document.addEventListener("mouseup", () => {
  const text = window.getSelection()?.toString().trim();

  if (text) {
    console.log("Selecionado:", text);

    try {
      chrome.runtime.sendMessage({ word: text });
    } catch {
      console.log("Extensão recarregada");
    }
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "DEFINE") {
    showPopup(msg.word);
  }
});