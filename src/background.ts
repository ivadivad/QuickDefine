// Guarda a última palavra selecionada
let lastWord = "";

// Guarda o último significado (com fallback inicial)
let lastMeaning = "Nenhuma palavra selecionada";

// Cria o menu de contexto uma única vez quando a extensão instala
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "define-word", // ID único do botão
      title: "Definir palavra", // Texto que aparece no clique direito
      contexts: ["selection"], // Só aparece quando há texto selecionado
    });

    console.log("Context menu criado");
  });
});

// Listener principal de mensagens da extensão
chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {

  // Quando chega uma palavra para definir
  if (msg.word) {
    lastWord = msg.word;
    lastMeaning = "Carregando..."; // feedback imediato

    // Traduz a palavra para inglês (base da API de dicionário)
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${msg.word}`)
      .then((res) => res.json())
      .then((transData) => {
        const translated = transData[0][0][0]; // pega tradução

        // Busca definição em inglês
        return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${translated}`);
      })
      .then((res) => res.json())
      .then((data) => {
        const definition =
          data[0]?.meanings?.[0]?.definitions?.[0]?.definition ||
          "Sem definição"; // fallback se não achar

        // Traduz definição para português
        return fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${definition}`);
      })
      .then((res) => res.json())
      .then((translatedDef) => {
        lastMeaning = translatedDef[0][0][0]; // salva definição final

        // responde para quem pediu (popup/content)
        sendResponse({
          word: lastWord,
          meaning: lastMeaning,
        });
      })
      .catch(() => {
        lastMeaning = "Erro ao buscar definição"; // fallback de erro

        // responde mesmo em caso de erro
        sendResponse({
          word: lastWord,
          meaning: lastMeaning,
        });
      });

    return true; // mantém o canal aberto (necessário para async)
  }

  // Quando o popup pede os dados atuais
  if (msg.type === "GET_DATA") {
    sendResponse({
      word: lastWord,
      meaning: lastMeaning,
    });
  }
});

// Listener do clique direito (menu de contexto)
chrome.contextMenus.onClicked.addListener((info, tab) => {

  // Verifica se foi o botão correto
  if (info.menuItemId === "define-word") {
    const word = info.selectionText; // pega texto selecionado

    if (word && tab?.id) {
      // envia para o content script mostrar popup
      chrome.tabs.sendMessage(tab.id, {
        type: "DEFINE",
        word,
        position: null, // botão direito não tem posição exata
      });
    }
  }
});