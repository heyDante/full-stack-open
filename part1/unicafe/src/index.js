import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ heading }) => {
  return (
    <h1>{heading}</h1>
  );
}


const Button = ( { handleClick, text } ) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
}

const Statistics = ({ good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / total;
  const positive = (good / total) * 100;

  if (total === 0) {
    return (
      <p>No feedback given</p>
    );
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="total" value={total}/>
        <Statistic text="average" value={average}/>
        <Statistic text="positive" value={positive}/>
      </tbody>
    </table>
  );
}

const Statistic = ( { text, value } ) => {
  if (text === "positive") {
    return (
      <tr>
        <th>{text}</th>
        <td>{value}%</td>
    </tr>
    );
  }
  return (
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  );
}

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  return (
    <div>
      <Header heading="Give Feedback" />
      <Button handleClick={ () => setGood(good + 1) } text="GOOD" />
      <Button handleClick={ () => setNeutral(neutral + 1) } text="NEUTRAL" />
      <Button handleClick={ () => setBad(bad + 1) } text="BAD" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
    
  );
}

ReactDOM.render(<App />, document.getElementById('root'));