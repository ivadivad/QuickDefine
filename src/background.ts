let lastWord = "";
let lastMeaning = "Nenhuma palavra selecionada";

// 🔥 cria menu UMA VEZ só
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "define-word",
      title: "Definir palavra",
      contexts: ["selection"],
    });

    console.log("Context menu criado");
  });
});

// 🔹 lógica principal (CORRIGIDA)
chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.word) {
    lastWord = msg.word;
    lastMeaning = "Carregando...";

    fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${msg.word}`,
    )
      .then((res) => res.json())
      .then((transData) => {
        const translated = transData[0][0][0];

        return fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${translated}`,
        );
      })
      .then((res) => res.json())
      .then((data) => {
        const definition =
          data[0]?.meanings?.[0]?.definitions?.[0]?.definition ||
          "Sem definição";

        return fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${definition}`,
        );
      })
      .then((res) => res.json())
      .then((translatedDef) => {
        lastMeaning = translatedDef[0][0][0];

        sendResponse({
          word: lastWord,
          meaning: lastMeaning,
        });
      })
      .catch(() => {
        lastMeaning = "Erro ao buscar definição";

        sendResponse({
          word: lastWord,
          meaning: lastMeaning,
        });
      });

    return true; // 🔥 ESSENCIAL
  }

  if (msg.type === "GET_DATA") {
    sendResponse({
      word: lastWord,
      meaning: lastMeaning,
    });
  }
});

// 🔹 clique do botão direito
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "define-word") {
    const word = info.selectionText;

    if (word && tab?.id) {
      chrome.tabs.sendMessage(tab.id, {
        type: "DEFINE",
        word,
        position: null, // botão direito não tem posição
      });
    }
  }
});
