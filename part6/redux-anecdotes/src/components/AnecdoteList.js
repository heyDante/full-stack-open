import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { upvote } from '../reducers/anecdoteReducer';

const Anecdote = ({ content, votes, handleUpvote }) => {
  return (
    <div>
      <li>
        {content}
      </li>
      <div>
        has {votes}
        <button onClick={handleUpvote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state);

  return (
    <div>
      <ol>
        {
          anecdotes
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
              <Anecdote
                key={anecdote.id}
                content={anecdote.content}
                votes={anecdote.votes}
                handleUpvote={() => dispatch(upvote(anecdote.id))}
              />
            )
        }
      </ol>
    </div>
  );
};

export default AnecdoteList;