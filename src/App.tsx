import { useEffect, useState } from "react";

function App() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "GET_DATA" }, (response) => {
      if (response) {
        setWord(response.word);
        setMeaning(response.meaning);
      }
    });
  }, []);

  return (
    <div style={{ padding: 10, width: 250 }}>

      <p><strong>{word || "Nenhuma palavra selecionada"}</strong></p>

      <p>{meaning}</p>
    </div>
  );
}

export default App;