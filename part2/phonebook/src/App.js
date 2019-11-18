import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import contactServices from './services/contacts';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  useEffect( () => {
    contactServices
      .getAll()
      .then( (initialPersons) => {
        return setPersons(initialPersons);
      })
  }, []);

  const filteredPersons = persons.filter( (person) => person.name.toLowerCase().search(new RegExp(filter.toLowerCase())) === -1 ? false : true ); 

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const alreadyThere = persons.find( (person) => person.name === newName); // returns undefined if not found

    if (alreadyThere) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        contactServices
          .modifyContact(alreadyThere.id, newPerson)
          .then( (modifiedPerson) => {
            setPersons(persons.map( (person) => person.id === alreadyThere.id ? modifiedPerson : person)) 
            setNewName('');
            setNewNumber('');
          })
      }
      return;
    }

    contactServices
      .create(newPerson)
      .then( (newPerson) => {
        return setPersons(persons.concat(newPerson));
      })
    setNewName('');
    setNewNumber('');
  }

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  const handleClick = (id, name) => {
    if(window.confirm(`Delete ${name}`)) {
      contactServices
        .deleteContact(id)
        .then( (response) => {
          return setPersons(persons.filter( (person) => person.id !== id))
        })
    }
  }

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
      <Persons 
        persons={filteredPersons} 
        handleClick={handleClick}
      />
    </div>
  );
};

export default App;