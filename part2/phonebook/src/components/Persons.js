import React from 'react';
import Person from './Person';

const Persons = ( { persons, handleClick } ) => {
  const list = persons.map( (person) => 
    <Person 
      id={person.id}
      key={person.id}
      name={person.name}
      number={person.number}
      handleClick={handleClick}
    />
  );
  return (
    <ul>
      {list}
    </ul>
    
  );
}

export default Persons;