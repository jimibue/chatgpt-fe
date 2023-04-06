import "./App.css";
import { useState } from "react";
import axios from "axios";

function MultipleMessage() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userContent, setUserContent] = useState("");

  const renderMessages = () => {
    if (loading) {
        return <p>{JSON.stringify(messages)} + loading</p>;  
    }
    return <p>{JSON.stringify(messages)}</p>;
  };

  //  post '/basic' => {message:{user:string, content:string}}
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newMessage = { role: "user", content: userContent }
    let newMessages = [...messages, newMessage]
    // update messages to show the message the user just typed
    setMessages(newMessages)
    try {
      setLoading(true);
     // send all messages to the server 
      let res = await axios.post(
        // "https://jy-chatgpt-api-yo.onrender.com/multiple",
        "http://localhost:8080/multiple",
        {
          messages: newMessages,
        }
      );
      console.log(res);
     // update messages to show the what chatGPT responded with
      setMessages([...newMessages, res.data.completion]);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="multiple">
      <h1>multiple messages</h1>
      {renderMessages()}
      <form onSubmit={handleSubmit}>
        <input
          value={userContent}
          onChange={(e) => setUserContent(e.target.value)}
        />
        <button disabled={loading}>{loading ? "loading" : "ask"}</button>
      </form>
    </div>
  );
}

export default MultipleMessage;
