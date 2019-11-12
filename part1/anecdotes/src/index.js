import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ( { handleClick, text } ) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
}

const Anecdote = ( { anecdote, votes } ) => {
  return (
    <p>{anecdote + ' has ' + votes + ' votes'}</p>
  );
}

const App = ( { anecdotes } ) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const mostVotesIndex = votes.indexOf(Math.max(...votes));

  const handleClickSelected = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  }

  const handleClickVote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote 
        anecdote={anecdotes[selected]} 
        votes={votes[selected]} 
      />
      <br />
      <Button 
        handleClick={handleClickVote} 
        text="Vote"
      />
      <Button 
        handleClick={handleClickSelected} 
        text="Next Anecdote"
      />
      <h2>Anecdote with most votes</h2>
      <Anecdote 
        anecdote={anecdotes[mostVotesIndex]} 
        votes={votes[mostVotesIndex]} 
      />
    </div>
  );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));