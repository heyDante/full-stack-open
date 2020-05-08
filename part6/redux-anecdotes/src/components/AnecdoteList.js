import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { upvote } from '../reducers/anecdoteReducer';
import { upvoteNotification, emptyNotification } from '../reducers/notificationReducer';

const Anecdote = ({ content, votes, handleUpvote }) => {
  return (
    <div className="anecdote">
      <li>
        {content}
      </li>
      <div>
         Votes: <strong>{votes}</strong>
        <button onClick={handleUpvote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state.anecdotes);

  const handleUpvote = (anecdote) => {
    dispatch(upvote(anecdote.id));
    dispatch(upvoteNotification(anecdote.content));
    setTimeout(() => {
      dispatch(emptyNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <ol>
        {
          anecdotes
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
              <Anecdote
                key={anecdote.id}
                content={anecdote.content}
                votes={anecdote.votes}
                handleUpvote={() => handleUpvote(anecdote)}
              />
            )
        }
      </ol>
    </div>
  );
};

export default AnecdoteList;