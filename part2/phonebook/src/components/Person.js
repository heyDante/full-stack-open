import React from 'react';

const Person = ( { name, number, id, handleClick} ) => {
  return (
    <li>
      {name} {number}
      <button onClick={ () => handleClick(id, name)}>DELETE</button>
    </li>
  );
}

export default Person;