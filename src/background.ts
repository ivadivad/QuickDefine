let lastWord = "";
let lastMeaning = "Nenhuma palavra selecionada";

chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.word) {
    lastWord = msg.word;
    lastMeaning = "Carregando...";

    // 🔹 traduz palavra para inglês
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${msg.word}`)
      .then(res => res.json())
      .then(transData => {
        const translated = transData[0][0][0];

        // 🔹 busca definição em inglês
        return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${translated}`);
      })
      .then(res => res.json())
      .then(data => {
        const definition =
          data[0]?.meanings?.[0]?.definitions?.[0]?.definition ||
          "Sem definição";

        // 🔹 traduz definição para português
        return fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${definition}`);
      })
      .then(res => res.json())
      .then(translatedDef => {
        lastMeaning = translatedDef[0][0][0];
      })
      .catch(() => {
        lastMeaning = "Erro ao buscar definição";
      });
  }

  if (msg.type === "GET_DATA") {
    sendResponse({
      word: lastWord,
      meaning: lastMeaning
    });
  }
});