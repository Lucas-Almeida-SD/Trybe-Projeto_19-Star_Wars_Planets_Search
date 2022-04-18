import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filter() {
  const { data, filterByName, setFilterByName } = useContext(MyContext);

  const handleChange = ({ target: { value } }) => {
    setFilterByName(value);
  };

  if (data.length > 0) {
    return (
      <div>
        <input
          data-testid="name-filter"
          type="text"
          value={ filterByName }
          onChange={ handleChange }
        />
      </div>
    );
  }
  return null;
}

export default Filter;
