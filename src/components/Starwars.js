import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import ComparisonFilter from './ComparisonFilter';
import Header from './Header';
import OrderFilter from './OrderFilter';
import Table from './Table';
import './starwars.css';
import starwarsLogo from '../imgs/starwars-logo.gif';

function Starwars() {
  const { isFetching, error } = useContext(MyContext);

  const renderContent = () => (
    (!isFetching) ? (
      <>
        <Header />
        <main>
          <section className="all-filters-section">
            <h2>Filters</h2>
            <OrderFilter />
            <ComparisonFilter />
          </section>
          <Table />
        </main>
      </>) : (<img className="logo" src={ starwarsLogo } alt="logo starwars" />)
  );

  return (
    (!error) ? (renderContent()) : (
      <h1 className="error-message" style={ { color: 'white' } }>
        Ops, algo deu errado. Recarregue sua página!
      </h1>)
  );
}

export default Starwars;
