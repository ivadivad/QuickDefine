export function showPopup(word: string) {
  // remove popup anterior
  const existing = document.getElementById("quickdefine-popup");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.id = "quickdefine-popup";

  popup.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <strong>${word}</strong>
      <span id="qd-close" style="cursor:pointer; font-size:16px;">✕</span>
    </div>
    <div id="qd-meaning" style="margin-top:8px;">Carregando...</div>
  `

  Object.assign(popup.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#2d3748", // 🔥 cinza escuro mais suave
    color: "#f7fafc",
    padding: "14px",
    borderRadius: "12px",
    zIndex: "999999",
    width: "260px",
    fontSize: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    fontFamily: "Arial, sans-serif"
  });

  document.body.appendChild(popup);

  // 🔥 botão de fechar
  document.getElementById("qd-close")?.addEventListener("click", () => {
    popup.remove();
  });

  // 🔥 fechar ao clicar fora
  setTimeout(() => {
    document.addEventListener("click", function handleOutside(e) {
      if (!popup.contains(e.target as Node)) {
        popup.remove();
        document.removeEventListener("click", handleOutside);
      }
    });
  }, 0);

  // 🔥 busca definição
  chrome.runtime.sendMessage({ word }, (response) => {
    const meaningEl = document.getElementById("qd-meaning");

    if (meaningEl && response) {
      meaningEl.innerText = response.meaning;
    }
  });
}