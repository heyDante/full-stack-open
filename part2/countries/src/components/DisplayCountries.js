import React from 'react';
import DisplayCountry from './DisplayCountry';

// const Button = (props) => {
//   return (
//     <button onClick={props.handleClick}>{props.text}</button>
//   );
// }

const DisplayCountries = ( { countries } ) => {

  const handleClick = (country) => {
    console.log('countries', country);
  }

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
      {countries.map( (country, i) => 
        <div key={country.name}>
          {country.name}
          <button onClick={ () => handleClick(countries[i]) }>show</button>
        </div>
      )}
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