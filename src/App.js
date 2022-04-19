import React from 'react';
import './App.css';
import ComparisonFilter from './components/ComparisonFilter';
import Filter from './components/Filter';
import OrderFilter from './components/OrderFilter';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <h1>Starwars</h1>
      <main>
        <Filter />
        <ComparisonFilter />
        <OrderFilter />
        <Table />
      </main>
    </Provider>
  );
}

export default App;

// iniciando
