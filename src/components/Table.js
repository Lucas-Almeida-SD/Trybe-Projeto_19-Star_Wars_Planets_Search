import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { data, filteredData } = useContext(MyContext);

  const renderTHead = (columnsName) => (
    <thead>
      <tr>
        {columnsName.map((e) => <th key={ e }>{e}</th>)}
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

  if (data.length > 0) {
    const columnsName = Object.keys(data[0]);
    return (
      <table border="1">
        {renderTHead(columnsName)}
        {renderTBody(columnsName)}
      </table>
    );
  }
  return null;
}

export default Table;
