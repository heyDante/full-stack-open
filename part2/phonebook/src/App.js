import React, { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

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

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  const filteredPersons = persons.filter( (person) => person.name.toLowerCase().search(new RegExp(filter.toLowerCase())) === -1 ? false : true ); 


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter={filter}
        handleFilter={handleFilter}
      />
      <h2>Add a new contact</h2>
      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;