import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import NameFilter from './NameFilter';
import formatName from '../helpers/formatName';
import './table.css';

function Table() {
  const { data, filteredData } = useContext(MyContext);

  const renderTHead = (columnsName) => (
    <thead>
      <tr>
        {columnsName.map((e) => <th key={ e }>{formatName(e)}</th>)}
      </tr>
    </thead>
  );

  const renderColumns = (line, column, lineIndex, colIndex) => {
    const columnData = line[column];
    if (Array.isArray(columnData)) {
      return (
        <td key={ `${column}-${lineIndex}` }>
          {columnData.map((e, i) => <p key={ `${column}-${lineIndex}-${i}` }>{e}</p>)}
        </td>
      );
    }
    return (
      <td
        key={ `${column}-${lineIndex}` }
        data-testid={ (colIndex === 0) && 'planet-name' }
      >
        {columnData}
      </td>
    );
  };

  const renderTBody = (columnsName) => (
    <tbody>
      {filteredData.map((line, lineIndex) => (
        <tr key={ line.name }>
          {columnsName.map((column, colIndex) => (
            renderColumns(line, column, lineIndex, colIndex)))}
        </tr>
      ))}
    </tbody>
  );

  const columnsName = Object.keys(data[0]);
  return (
    <section className="table-section">
      <h2>Planets Information</h2>
      <NameFilter />
      {(filteredData.length > 0) ? (
        <div className="table-div">
          <table border="1" className="table">
            {renderTHead(columnsName)}
            {renderTBody(columnsName)}
          </table>
        </div>) : <h3>Information not found</h3>}
    </section>
  );
}

export default Table;
