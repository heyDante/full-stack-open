import React from 'react';
import Person from './Person';

const Persons = ( { persons } ) => {
  const list = persons.map( (person) => 
    <Person 
      key={person.name}
      name={person.name}
      number={person.number}
    />
  );
  return (
    <ul>
      {list}
    </ul>
    
  );
}

export default Persons;