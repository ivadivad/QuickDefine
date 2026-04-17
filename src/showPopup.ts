// Função responsável por criar e exibir o popup com a definição
export function showPopup(word: string, position?: { x: number; y: number } | null) {

  // Remove qualquer popup existente para evitar duplicação
  const existing = document.getElementById("quickdefine-popup");
  if (existing) existing.remove();

  // Cria o elemento principal do popup
  const popup = document.createElement("div");
  popup.id = "quickdefine-popup";

  // Define o conteúdo inicial do popup (palavra + botão de fechar + loading)
  popup.innerHTML = `
    <div style="display:flex; justify-content:space-between;">
      <strong>${word}</strong>
      <span id="qd-close" style="cursor:pointer;">✕</span>
    </div>
    <div id="qd-meaning" style="margin-top:8px;">Carregando...</div>
  `;

  // Aplica estilos básicos ao popup
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

  // Posiciona o popup próximo à palavra selecionada, se houver posição
  if (position) {
    popup.style.left = `${position.x}px`;
    popup.style.top = `${position.y + 20}px`; // desloca um pouco para baixo
  } else {
    // Caso não tenha posição (ex: clique com botão direito), fixa no canto
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.position = "fixed";
  }

  // Adiciona o popup ao DOM da página
  document.body.appendChild(popup);

  // Adiciona evento para fechar ao clicar no botão "X"
  document.getElementById("qd-close")?.addEventListener("click", () => {
    popup.remove();
  });

  // Fecha o popup ao clicar fora dele
  setTimeout(() => {
    document.addEventListener("click", function handleOutside(e) {
      if (!popup.contains(e.target as Node)) {
        popup.remove();
        document.removeEventListener("click", handleOutside);
      }
    });
  }, 0);

  // Solicita a definição ao background
  chrome.runtime.sendMessage({ word }, (response) => {
    const meaningEl = document.getElementById("qd-meaning");

    // Atualiza o texto do popup com a resposta recebida
    if (meaningEl && response) {
      meaningEl.innerText = response.meaning;
    }
  });
}