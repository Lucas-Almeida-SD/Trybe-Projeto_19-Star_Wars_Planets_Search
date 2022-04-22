import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const PLANETS_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const [filterByName, setFilterByName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({ column: undefined, sort: undefined });

  const checkSort = (next, prev, checkNumberOrUnknown, ascendente) => {
    let newNext = next; let newPrev = prev;
    const negNumber1 = -1;
    if (checkNumberOrUnknown) {
      if (next === 'unknown') { return (ascendente) ? 1 : negNumber1; }
      if (prev === 'unknown') { return (ascendente) ? negNumber1 : 1; }
      newNext = parseInt(next, 10);
      newPrev = parseInt(prev, 10);
    }
    if (newNext > newPrev) { return 1; }
    if (newNext < newPrev) { return negNumber1; }
    return 0;
  };

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
    const getPlanets = async () => {
      setIsFetching(true);
      const json = await fetch(PLANETS_URL)
        .then((response) => response.json())
        .catch(() => 'error');
      if (json !== 'error') {
        const { results } = json;
        const newData = results.map((e) => {
          delete e.residents;
          return e;
        });
        newData.sort((next, prev) => checkSort(next.name, prev.name));
        setData(newData);
      } else { setError(true); }
      setIsFetching(false);
    };
    getPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filterData = () => {
      let newData = data.filter((e) => (
        e.name.toLowerCase().includes(filterByName.toLowerCase())));
      newData = filterByColumn(newData);
      return newData;
    };
    setFilteredData(filterData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filterByName, filterByNumericValues]);

  useEffect(() => {
    const sortData = () => {
      const newData = data.map((e) => e); // apenas um clone do filteredData
      const { column, sort } = order;
      if (sort === 'ASC') {
        newData.sort((next, prev) => (
          checkSort(next[column], prev[column], true, true)));
      } else {
        newData.sort((next, prev) => checkSort(prev[column], next[column], true));
      }
      setData(newData);
    };
    if (order.column) {
      sortData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const contextValue = {
    data,
    isFetching,
    error,
    filteredData,
    filterByName,
    filterByNumericValues,
    order,
    setFilterByName,
    setFilterByNumericValues,
    setOrder,
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
