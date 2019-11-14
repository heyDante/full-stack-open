import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1234567890' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const alreadyThere = persons.find( (person) => person.name === newName)
    if (alreadyThere) {
      alert(`${newName} is already added to phonebook`);
      return;
    };
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  const filteredPersons = persons.filter( (person) => person.name.toLowerCase().search(new RegExp(filter)) === -1 ? false : true ); 

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input 
          value={filter} 
          onChange={handleFilter}
        />
      </div>
      <h3>Add a new contact</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={ (event) => setNewName(event.target.value) }
          />
          <br />
          number: 
          <input 
            value={newNumber} 
            onChange={ (event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map( (person) => 
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  );
};

export default App;