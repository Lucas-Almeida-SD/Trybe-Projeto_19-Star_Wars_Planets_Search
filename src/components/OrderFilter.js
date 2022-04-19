import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

const COLUMNS = ['population', 'orbital_period', 'diameter', 'rotation_period',
  'surface_water'];

function OrderFilter() {
  const { setOrder } = useContext(MyContext);

  const [selectColumn, setSelectColumn] = useState(COLUMNS[0]);
  const [radioBtn, setRadioBtn] = useState('ASC');

  const handleChange = ({ target: { value } }, setFunc) => {
    setFunc(value);
  };

  const hancleClick = () => {
    setOrder({ column: selectColumn, sort: radioBtn });
  };

  return (
    <section>
      <select
        data-testid="column-sort"
        value={ selectColumn }
        onChange={ (event) => handleChange(event, setSelectColumn) }
      >
        {COLUMNS.map((e) => <option key={ e }>{e}</option>)}
      </select>
      <div>
        <label htmlFor="ASC">
          Ascendente
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            name="order"
            id="ASC"
            value="ASC"
            checked={ (radioBtn === 'ASC') }
            onChange={ (event) => handleChange(event, setRadioBtn) }
          />
        </label>
        <label htmlFor="DESC">
          Descendente
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            name="order"
            id="DESC"
            value="DESC"
            checked={ (radioBtn === 'DESC') }
            onChange={ (event) => handleChange(event, setRadioBtn) }
          />
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ hancleClick }
      >
        Ordenar
      </button>
    </section>
  );
}

export default OrderFilter;
