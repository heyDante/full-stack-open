import React from 'react';

const DisplayCountry = (props) => {
  const [ country ] = props.country;
  return (
    <div>
      <h2>{country.name}</h2>
      Capital: {country.capital}
      <br />
      Population: {country.population}
      <br />
      <h3>Languages</h3>
      <ul>
        {country.languages.map( (language) => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={`${country.name}'s flag`}/>
    </div>
  );
}

export default DisplayCountry;