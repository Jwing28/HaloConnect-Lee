import React from 'react';
import './App.css';

const Square = ({ row, column, value, onSelect }) => {
  const [color, setColor] = React.useState(0);
  const colorKey = {
    0: 'white',
    1: 'yellow',
    2: 'red'
  };

  return (
    <div className="square">
      <button
        className="slot"
        style={{ backgroundColor: colorKey[value] }}
        onClick={() => {
          setColor(colorKey[color]);
          onSelect(row, column, value);
        }}
      />
    </div>
  );
};

export default Square;
