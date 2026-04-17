import { useEffect, useState } from "react";

function App() {
  // Guarda a palavra selecionada
  const [word, setWord] = useState("");

  // Guarda o significado da palavra
  const [meaning, setMeaning] = useState("");

  useEffect(() => {
    // Pede os dados pro background assim que o popup abre
    chrome.runtime.sendMessage({ type: "GET_DATA" }, (response) => {

      // Só atualiza se vier resposta válida
      if (response) {
        setWord(response.word);
        setMeaning(response.meaning);
      }
    });

  }, []); // ⚡ Roda só uma vez quando o componente carrega

  return (
    <div style={{ padding: 10, width: 250 }}>
      
      {/* 🔤 Mostra a palavra ou fallback */}
      <p><strong>{word || "Nenhuma palavra selecionada"}</strong></p>

      {/* Mostra o significado */}
      <p>{meaning}</p>

    </div>
  );
}

export default App;