import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

const COLUMNS = ['population', 'orbital_period', 'diameter', 'rotation_period',
  'surface_water'];
const COMPARATORS = ['maior que', 'menor que', 'igual a'];

function ComparisonFilter() {
  const { data, filterByNumericValues, setFilterByNumericValues } = useContext(MyContext);
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
    const newColumns = columns.filter((e) => e !== selectedColumn);
    setColumns(newColumns);
    setSelectedColumn(newColumns[0]);
    setSelectedComparator('maior que');
    setSelectedValue('0');
  };

  // const filterColumns = () => {
  //   const columnsKey = filterByNumericValues.map((e) => e.column);
  //   return COLUMNS.filter((e) => !columnsKey.includes(e));
  // };

  const removeFilter = (column) => {
    const newFilterByNumericValues = filterByNumericValues.filter((e) => (
      e.column !== column
    ));
    setFilterByNumericValues(newFilterByNumericValues);
    const newColumn = COLUMNS.filter((e) => [...columns, column].includes(e));
    setColumns(newColumn);
    setSelectedColumn(newColumn[0]);
  };

  const renderFilters = () => (
    <div>
      {filterByNumericValues.map(({ column, comparison, value }) => (
        <div key={ column } data-testid="filter">
          <p>{`${column} ${comparison} ${value}`}</p>
          <button type="button" onClick={ () => removeFilter(column) }>X</button>
        </div>
      ))}
    </div>
  );

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
    setColumns(COLUMNS);
    setSelectedColumn(COLUMNS[0]);
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
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover todas filtragens
        </button>
        {renderFilters()}
      </section>
    );
  }
  return null;
}

export default ComparisonFilter;
