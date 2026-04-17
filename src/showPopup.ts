export function showPopup(word: string, position?: { x: number; y: number } | null) {
  const existing = document.getElementById("quickdefine-popup");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.id = "quickdefine-popup";

  popup.innerHTML = `
    <div style="display:flex; justify-content:space-between;">
      <strong>${word}</strong>
      <span id="qd-close" style="cursor:pointer;">✕</span>
    </div>
    <div id="qd-meaning" style="margin-top:8px;">Carregando...</div>
  `;

  Object.assign(popup.style, {
    position: "absolute",
    background: "#2d3748",
    color: "#fff",
    padding: "12px",
    borderRadius: "10px",
    zIndex: "999999",
    width: "250px",
    fontSize: "14px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
  });

  // 🔥 posicionamento inteligente
  if (position) {
    popup.style.left = `${position.x}px`;
    popup.style.top = `${position.y + 20}px`; // um pouco abaixo da palavra
  } else {
    // fallback (botão direito)
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.position = "fixed";
  }

  document.body.appendChild(popup);

  // fechar botão
  document.getElementById("qd-close")?.addEventListener("click", () => {
    popup.remove();
  });

  // fechar clicando fora
  setTimeout(() => {
    document.addEventListener("click", function handleOutside(e) {
      if (!popup.contains(e.target as Node)) {
        popup.remove();
        document.removeEventListener("click", handleOutside);
      }
    });
  }, 0);

  // buscar definição
  chrome.runtime.sendMessage({ word }, (response) => {
    const meaningEl = document.getElementById("qd-meaning");

    if (meaningEl && response) {
      meaningEl.innerText = response.meaning;
    }
  });
}