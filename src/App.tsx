import { useEffect } from "react";


function App() {

  function handleMessage(message: any) {
    console.log(message.word);
    console.log(message.meaning);
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <div>
      <h1>RightDefine</h1>
    </div>
  );
}

export default App;