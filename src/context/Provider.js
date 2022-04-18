import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const PLANETS_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch(PLANETS_URL)
        .then((response) => response.json());
      const newData = results.map((e) => {
        delete e.residents;
        return e;
      });
      setData(newData);
    };
    getPlanets();
  }, [children]);

  const contextValue = { data };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.object,
}.isRequired;
