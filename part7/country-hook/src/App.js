import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value)
  };

  return {
    type,
    value,
    onChange
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) {
      return setCountry(null);
    }
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then((response) => {
          setCountry({
          data: response.data[0],
          found: true
        });
      })
      .catch(error => {
        setCountry({
          found: false,
          name: name
        });
        console.log(error);
      }); 
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return (
      <div className="start">
        Start searching for your country!
      </div>
    );
  }

  if (!country.found) {
    return (
      <div className="not-found">
        <div className="not-found-icon"></div>
        <span className="not-found-text">
          What are you even searching? <br />
          Is <span style={{fontWeight: '500'}}>{country.name}</span> a country?
        </span>
      </div>
    );
  }

  return (
    <div className="country">
      <h3>{country.data.name} </h3>
      <div className="label">
        capital 
        <span className="data">{country.data.capital} </span>
      </div>
      <div className="label">population 
        <span className="data">{country.data.population} </span>
      </div> 
      <div className="label">region 
        <span className="data">{country.data.region} </span>
      </div> 
      <img className="country-image" src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div className="app">
      <Country country={country} />

      <form onSubmit={fetch}>
        <input {...nameInput} placeholder="country"/>
        <button>
          <div className="search">
          </div>
        </button>
        <br style={{clear: 'both'}}/>
      </form>
    </div>
  );
};

export default App;