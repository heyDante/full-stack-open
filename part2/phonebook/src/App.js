import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import contactServices from './services/contacts';
import Notification from './components/Notification';
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ notification, setNotification ] = useState(null);

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
            setNotification({type: 'update', message: `Updated ${modifiedPerson.name}!`});
            setTimeout(() => {
              setNotification(null);
            }, 3000);
            setPersons(persons.map( (person) => person.id === alreadyThere.id ? modifiedPerson : person)) 
            setNewName('');
            setNewNumber('');
          })
          .catch( (error) => {
            setNotification({type: 'error', message: `${newName} is already removed from the server`});
            setTimeout(() => {
              setNotification(null);
            }, 3000);
            setPersons(persons.filter( (person) => person.id !== alreadyThere.id ));
            setNewName('');
            setNewNumber('');
          })
      }
      return;
    }

    contactServices
      .create(newPerson)
      .then( (newPerson) => {
        setNotification({type: 'add', message: `Added ${newPerson.name}!`});
        setTimeout(() => {
          setNotification(null);
        }, 3000);
        return setPersons(persons.concat(newPerson));
      })
      /* -- Validating errors with data from mongoose -- */
      .catch( (error) => {
        console.log(error.response.data);
        setNotification({type: 'error', message: error.response.data.error});
        setTimeout(() => {
          setNotification(null);
        }, 5000);
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
          setNotification({type: 'delete', message: `Deleted ${name}`});
          setTimeout(() => {
            setNotification(null);
          }, 3000);
          return setPersons(persons.filter( (person) => person.id !== id))
        })
    }
  }

  return (
    <div>
      <Notification 
        notification={notification}
      />
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