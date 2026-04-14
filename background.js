chrome.contextMenus.onClicked.addListener((info, tab) => {
  const word = info.selectionText;

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    .then(data => {
      const meaning = data[0]?.meanings[0]?.definitions[0]?.definition;

      chrome.tabs.sendMessage(tab.id, {
        type: "SHOW_MEANING",
        word,
        meaning
      });
    });
});