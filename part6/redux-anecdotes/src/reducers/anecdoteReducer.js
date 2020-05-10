import anecdoteServices from '../services/anecdote';

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {

    case 'UPVOTE': {
      const upvotedAnecdote = action.data;

      return state.map((anecdote) => {
        return anecdote.id !== upvotedAnecdote.id ? anecdote : upvotedAnecdote;
      });
    }

    case 'ADD_ANECDOTE': {
      const content = action.data;
      return [...state, content];
    }

    case 'INTIALIZE_ANECDOTES':
      return action.data;

    default:
      return state;
  }
};

/* -- Action Creators -- */
export const upvote = (anecdote) => {
  return async (dispatch) => {
    const upvotedAnecdote = await anecdoteServices.upvoteAnecdote(anecdote);
    dispatch({
      type: 'UPVOTE',
      data: upvotedAnecdote
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServices.createAnecdote(content);
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll();
    dispatch({
      type: 'INTIALIZE_ANECDOTES',
      data: anecdotes
    });
  };
};

export default reducer;