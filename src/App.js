import React from 'react';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <h1>Starwars</h1>
      <main>
        <Filter />
        <Table />
      </main>
    </Provider>
  );
}

export default App;

// iniciando
