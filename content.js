document.addEventListener("mouseup", () => {
  const text = window.getSelection()?.toString();

  if (text) {
    chrome.runtime.sendMessage({ word: text });
  }
});