import React from 'react';
import { useDispatch, connect } from 'react-redux';

import { upvote } from '../reducers/anecdoteReducer';
import { upvoteNotification } from '../reducers/notificationReducer';

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

const AnecdoteList = ({ anecdotes, filterKeywords }) => {
  const dispatch = useDispatch();

  const handleUpvote = (anecdote) => {
    dispatch(upvote(anecdote));

    dispatch(upvoteNotification(anecdote.content, 5));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <ol>
        {
          anecdotes
            .filter((anecdote) => anecdote.content.toLowerCase().search(new RegExp(filterKeywords.toLowerCase())) === -1 ? false : true)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filterKeywords: state.filter
  };
};

export default connect(mapStateToProps)(AnecdoteList);