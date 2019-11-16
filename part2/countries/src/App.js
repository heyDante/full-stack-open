import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayCountries from './components/DisplayCountries';

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ search, setSearch ] = useState('');

  const hook = () => {
    console.log('axios set to run')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( (response) => { 
        console.log('fulfilled', response);
        setCountries(response.data);
      })
  };

  useEffect(hook, []);

  const filteredCountries = countries.filter( (country) => country.name.toLowerCase().search(new RegExp(search.toLowerCase())) === -1 ? false : true);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  // console.log('countries', filteredCountries);

  return (
    <div>
      Find Countries: 
      <input 
        value={search}
        onChange={handleChange}
      />
      <br />
      <DisplayCountries 
        countries={filteredCountries}
        searchTerm={search}
        setSearch={setSearch}
      />
    </div>
  );
}

export default App;