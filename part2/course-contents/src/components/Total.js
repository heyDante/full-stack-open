import React from 'react';

const Total = ( { parts } ) => {
  const total = parts.map( (part) => part.exercises ).reduce( (a, c) => a + c);

  return (
    <p>Total of {total} exercises</p>
  );
}

export default Total;