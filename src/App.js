import { useState } from "react";

const App = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "Who won the latest Nobel Peace Prize?",
    "Where does pizza come from?",
    "How do you make peanut-butter and jelly sandwich?",
  ];

  const surprise = () => {
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const getResponse =async ()=> {
    if(!value){
      setError("Error! Please ask a question!")
      return
    }
    try {
      const options ={
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const response = await fetch('http://localhost:3300/chat', options)
      const data = await response.text()
      console.log(data)
    } catch (error) {
      console.error(error)
      setError("Something went wrong! Please try again later.")
    }
  }

  return (
    <div className="app">
      <p>
        What do you want to know?
        <button className="surprise" onClick={surprise} disabled={!chatHistory}>
          Surpise me!
        </button>
      </p>
      <div className="input-container">
        <input
          value={value}
          placeholder="When is Christmas...?"
          onChange={(e) => setValue(e.target.value)}
        />
        {!error && <button onClick={getResponse}>Ask me</button>}
        {error && <button>Clear</button>}
      </div>
      {error && <p>{error}</p>}
      <div className="search-result">
        <div key={""}>
          <p className="answer"></p>
        </div>
      </div>
    </div>
  );
};

export default App;
