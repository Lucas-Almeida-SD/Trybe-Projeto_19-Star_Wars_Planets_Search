import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';
import formatName from '../helpers/formatName';
import './comparisonFilter.css';
import lixeira from '../imgs/lixeira.png';

const COLUMNS = ['population', 'orbital_period', 'diameter', 'rotation_period',
  'surface_water'];
const COMPARATORS = ['maior que', 'menor que', 'igual a'];
const negNumber1 = -1;

function ComparisonFilter() {
  const { filterByNumericValues, setFilterByNumericValues } = useContext(MyContext);
  const [columns, setColumns] = useState(COLUMNS);
  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparator, setSelectedComparator] = useState('maior que');
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = ({ target: { value } }, setFunction) => {
    if (parseInt(value, 10)) {
      const newValue = parseInt(value, 10);
      setFunction((newValue > 0) ? newValue : newValue * (negNumber1));
    } else { setFunction(value); }
  };

  const renderSelect = ([labelName, array, testid, value, setFunction]) => {
    const id = labelName.split(':')[0].toLowerCase();
    return (
      <label htmlFor={ `${id}-comparison` } className={ `${id}-comparison` }>
        <span>{labelName}</span>
        <select
          data-testid={ testid }
          id={ `${id}-comparison` }
          value={ value }
          onChange={ (event) => handleChange(event, setFunction) }
        >
          {array.map((e) => (
            <option key={ e } value={ e }>{formatName(e)}</option>
          ))}
        </select>
      </label>
    );
  };

  const handleClick = () => {
    const newValue = parseInt(selectedValue, 10);
    console.log(newValue);
    setFilterByNumericValues((prev) => [
      ...prev,
      { column: selectedColumn, comparison: selectedComparator, value: newValue },
    ]);
    const newColumns = columns.filter((e) => e !== selectedColumn);
    setColumns(newColumns);
    setSelectedColumn(newColumns[0]);
    setSelectedComparator('maior que');
    setSelectedValue('');
  };

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
    filterByNumericValues.map(({ column, comparison, value }) => (
      <div key={ column } data-testid="filter" className="comparison-filter">
        <p>{formatName(`${column} ${comparison} ${value}`)}</p>
        <img
          src={ lixeira }
          alt="lixeira"
          onClick={ () => removeFilter(column) }
          aria-hidden="true"
        />
      </div>
    ))
  );

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
    setColumns(COLUMNS);
    setSelectedColumn(COLUMNS[0]);
    setSelectedValue('');
  };

  return (
    <section className="comparison-filter-section">
      <div className="comparison-filter-fields">
        {(columns.length > 0) && (
          <>
            <div>
              {renderSelect([
                'Coluna: ', columns, 'column-filter', selectedColumn, setSelectedColumn,
              ])}
            </div>
            <div>
              {renderSelect([
                'Operador: ', COMPARATORS, 'comparison-filter', selectedComparator,
                setSelectedComparator,
              ])}
            </div>
            <div>
              <input
                data-testid="value-filter"
                type="number"
                className="value-input"
                value={ selectedValue }
                placeholder="Valor"
                onChange={ (event) => handleChange(event, setSelectedValue) }
              />
            </div>
            <div>
              <button
                type="button"
                data-testid="button-filter"
                className="filter-btn"
                onClick={ handleClick }
                disabled={ columns.length === 0 || !selectedValue }
              >
                Filtrar
              </button>
            </div>
          </>
        )}
        <div>
          <button
            type="button"
            data-testid="button-remove-filters"
            className="remove-all-filters-btn"
            onClick={ removeAllFilters }
            disabled={ (filterByNumericValues.length === 0) }
          >
            Remover todas filtragens
          </button>
        </div>
      </div>
      <div className="comparison-filters-div">
        {renderFilters()}
      </div>
    </section>
  );
}

export default ComparisonFilter;
