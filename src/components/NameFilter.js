import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import './nameFilter.css';

function NameFilter() {
  const { filterByName, setFilterByName } = useContext(MyContext);

  const handleChange = ({ target: { value } }) => {
    setFilterByName(value);
  };

  return (
    <section className="name-filter-section">
      <input
        data-testid="name-filter"
        type="text"
        value={ filterByName }
        placeholder="Search for a planet!"
        onChange={ handleChange }
      />
    </section>
  );
}

export default NameFilter;
