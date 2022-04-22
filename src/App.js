import React from 'react';
import './App.css';
import Starwars from './components/Starwars';
import Provider from './context/Provider';
import back from './imgs/wave-haikei(4).svg';

function App() {
  return (
    <Provider>
      <div className="background">
        <img src={ back } alt="scatter-haikei" />
      </div>
      <div className="content">
        <Starwars />
      </div>
    </Provider>
  );
}

export default App;
