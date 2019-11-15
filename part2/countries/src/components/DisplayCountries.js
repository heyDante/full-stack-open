import React from 'react';
import DisplayCountry from './DisplayCountry';

const DisplayCountries = ( { countries } ) => {

  if (countries.length === 1) {
    return (
    <DisplayCountry 
      country={countries}
    />
    );
  }

  else if (countries.length > 0 && countries.length <= 10) {
    return (
      <div>
      {countries.map( (country) => <div key={country.name}>{country.name}</div>)}
      </div>
      
    );
  }
  
  else {
    return (
      <p>Too many matches, specify another filter.</p>
    );
  }
  
 

}

export default DisplayCountries;