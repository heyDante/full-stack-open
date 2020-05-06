import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { upvote, createAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  /* -- Function to add anecdotes -- */
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    // alert(content);
    dispatch(createAnecdote(content));
    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(upvote(anecdote.id))}>vote</button>
            </div>
          </div>
        )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default App;