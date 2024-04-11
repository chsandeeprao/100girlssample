import './Chat.css';
import React, { useState } from 'react';


const Chat = () => {
  const [messages, setMessages] = useState([
  ]);
  const [input, setInput] = useState('');
  const [fullInput, setFullInput] = useState([
    { "role": "user", 
      "content": "act like a nutritionist and help me diagnose my child's nutritional health. if i ask keep the amount of questions less than 20 and ask me each question separately. if i answer in anything other than nutrition related then answer with \"sorry\". keep acting like a nutritionist until you complete the diagnosis and give the nutrition plan. after the diagnosis, give me a proper nutrition plan based on my eating habits"
    }
  ]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    getChatGPTResponse(input);
    setInput('');
  };

  const getChatGPTResponse = async (input) => {
    try {
      //setMessages([...messages, ]);
      const response = await fetchOpenAIChatCompletion(input);
      setMessages([...messages, { text: input}, { text: response }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchOpenAIChatCompletion = async (input) => {
    const test = '12'; // Replace 'YOUR_API_KEY' with your actual API key
    var messageArray = fullInput;
    if(input) {
      const message = {"role": "user", "content": input};
      //console.log("before request message::  " , message);
      messageArray = [...fullInput, message];
      //console.log("before request messageArray::  " , messageArray);
    }
    
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${test}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": messageArray,
          "temperature": 0.5
      })
    };
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const responseMessage = {"role":data.choices[0].message.role, 
                              "content":data.choices[0].message.content}
      //console.log("after response::  " , responseMessage);
      const responseArray = [...messageArray, responseMessage]
      //console.log("after response responseArray::  " , responseArray);
      setFullInput(responseArray);
      //console.log("after response fullInput::  " , fullInput);
      return data.choices[0].message.content; // Extracting the completed text from the response
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
      // Set submitted to true when the button is clicked
      setSubmitted(true);
      getChatGPTResponse(input);
  };

  return (
    <div className="chat-container">
      <div className="button-class">
        <label style={{ fontSize: '24px', fontFamily: 'unset', color: 'purple' }}> Hello! Do you want to build nutrition plan for your kid?</label>
        <button type="submit" name="submitBtn" value="Submit" disabled={submitted} onClick={handleSubmit}>
                Build nutrition plan for my kid!
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="messageClass">
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit} className="chat-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="send-button" disabled={!submitted}>Send</button>
      </form>
    </div>
  );
};

export default Chat;