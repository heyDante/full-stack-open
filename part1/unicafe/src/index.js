import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>{props.heading}</h1>
  );
}

const Button = (props) => {
  return (
    <button onCLick={props.handleClick}>{props.text}</button>
  );
}

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  return (
    <div>
      <Header heading="Give Feedback" />
      <Button text="GOOD" />
      <Button text="NEUTRAL" />
      <Button text="BAD" />
    </div>
    
  );
}

ReactDOM.render(<App />, document.getElementById('root'));