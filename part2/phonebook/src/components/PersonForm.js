import React from 'react';

const PersonForm = ( { handleSubmit, newName, newNumber, setNewName, setNewNumber } ) => {
  return (
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
  );
}

export default PersonForm;