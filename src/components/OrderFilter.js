import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';
import formatName from '../helpers/formatName';
import './orderFilter.css';

const COLUMNS = ['population', 'orbital_period', 'diameter', 'rotation_period',
  'surface_water'];

function OrderFilter() {
  const { setOrder } = useContext(MyContext);

  const [selectColumn, setSelectColumn] = useState(COLUMNS[0]);
  const [radioBtn, setRadioBtn] = useState('');

  const handleChange = ({ target: { value } }, setFunc) => {
    setFunc(value);
  };

  const hancleClick = () => {
    setOrder({ column: selectColumn, sort: radioBtn });
  };

  return (
    <section className="order-filter-section">
      <label htmlFor="orderBy" className="order-by-label">
        <span>Ordenar por:</span>
        <select
          data-testid="column-sort"
          id="orderBy"
          value={ selectColumn }
          onChange={ (event) => handleChange(event, setSelectColumn) }
        >
          {COLUMNS.map((e) => <option key={ e } value={ e }>{formatName(e)}</option>)}
        </select>
      </label>
      <div className="asc-desc-div">
        <label htmlFor="ASC">
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            name="order"
            id="ASC"
            value="ASC"
            onChange={ (event) => handleChange(event, setRadioBtn) }
          />
          <span>Ascendente</span>
        </label>
        <label htmlFor="DESC">
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            name="order"
            id="DESC"
            value="DESC"
            onChange={ (event) => handleChange(event, setRadioBtn) }
          />
          <span>Descendente</span>
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ hancleClick }
        disabled={ (!radioBtn) }
      >
        Ordenar
      </button>
    </section>
  );
}

export default OrderFilter;
