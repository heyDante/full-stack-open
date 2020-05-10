import React from 'react';
import { connect } from 'react-redux';

import { createAnecdote } from '../reducers/anecdoteReducer';
import { addedNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {

  /* -- Function to add anecdotes -- */
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    props.createAnecdote(content);

    /* -- Notification -- */
    props.addedNotification(content, 5);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

/* -- function way -- */
const mapDispatchToProps = (dispatch) => {
  return {
    createAnecdote: (content) => dispatch(createAnecdote(content)),
    addedNotification: (content, duration) => dispatch(addedNotification(content, duration))
  };
};

// /* -- object way -- */
// const mapDispatchToProps = {
//   createAnecdote,
//   addedNotification
// };

export default connect(null, mapDispatchToProps)(AnecdoteForm);