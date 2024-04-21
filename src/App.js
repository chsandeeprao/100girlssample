
import './App.css';
import React from 'react';
import Chat from './Chat';


function App() {
  return (
    <div className="App">
      <h1 style={{ color: 'white', fontSize: '38px', backgroundColor: '#007bff', padding: '10px', fontFamily: 'fantasy' }}>
        Nutrition Planner
      </h1>
      <Chat /> 
    </div>
  );

}

export default App;

