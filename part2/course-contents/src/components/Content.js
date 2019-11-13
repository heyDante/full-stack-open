import React from 'react';
import Part from '../components/Part';

const Content = ( { parts } ) => {

  const partArray = () => parts.map( (part) => 
    <Part 
      key={part.id}
      part={part.name}
      exercises={part.exercises}
    />
  );


  return (
    <>
      {partArray()}
    </>
  );
}

export default Content;