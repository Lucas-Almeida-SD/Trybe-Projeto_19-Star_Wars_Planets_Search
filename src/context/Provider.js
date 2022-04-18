import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const PLANETS_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

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

  const makeComparison = (e, index) => {
    const { column, comparison, value } = filterByNumericValues[index];
    if (comparison === 'maior que') {
      return (parseInt(e[column], 10) > parseInt(value, 10));
    }
    if (comparison === 'menor que') {
      return (parseInt(e[column], 10) < parseInt(value, 10));
    }
    return (parseInt(e[column], 10) === parseInt(value, 10));
  };

  const filterByColumn = (newData) => {
    let filterNewDataByColumn = newData.map((e) => e);
    for (let index = 0; index < filterByNumericValues.length; index += 1) {
      filterNewDataByColumn = filterNewDataByColumn.filter((e) => (
        makeComparison(e, index)));
    }
    return filterNewDataByColumn;
  };

  useEffect(() => {
    const filterData = () => {
      let newData = data.filter((e) => e.name.includes(filterByName));
      newData = filterByColumn(newData);
      return newData;
    };
    setFilteredData(filterData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filterByName, filterByNumericValues]);

  const contextValue = {
    data,
    filteredData,
    filterByName,
    filterByNumericValues,
    setFilterByName,
    setFilterByNumericValues,
  };

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
