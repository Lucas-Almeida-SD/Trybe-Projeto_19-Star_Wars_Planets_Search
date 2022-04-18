import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

const COLUMNS = ['population', 'orbital_period', 'diameter', 'rotation_period',
  'surface_water'];
const COMPARATORS = ['maior que', 'menor que', 'igual a'];

function ComparisonFilter() {
  const { data, setFilterByNumericValues } = useContext(MyContext);

  const [columns, setColumns] = useState(COLUMNS);
  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparator, setSelectedComparator] = useState('maior que');
  const [selectedValue, setSelectedValue] = useState('0');

  const handleChange = ({ target: { value } }, setFunction) => {
    setFunction(value);
  };

  const renderSelect = (array, testid, value, setFunction) => (
    <select
      data-testid={ testid }
      value={ value }
      onChange={ (event) => handleChange(event, setFunction) }
    >
      {array.map((e) => (
        <option key={ e }>{e}</option>
      ))}
    </select>
  );

  const handleClick = () => {
    setFilterByNumericValues((prev) => [
      ...prev,
      { column: selectedColumn, comparison: selectedComparator, value: selectedValue },
    ]);
    setColumns((prev) => prev.filter((e) => e !== selectedColumn));
    setSelectedColumn(columns[0]);
    setSelectedComparator('maior que');
    setSelectedValue('0');
  };

  if (data.length > 0) {
    return (
      <section>
        {renderSelect(columns, 'column-filter', selectedColumn, setSelectedColumn)}
        {renderSelect(COMPARATORS, 'comparison-filter', selectedComparator,
          setSelectedComparator)}
        <input
          data-testid="value-filter"
          type="number"
          value={ selectedValue }
          onChange={ (event) => handleChange(event, setSelectedValue) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </section>
    );
  }
  return null;
}

export default ComparisonFilter;
