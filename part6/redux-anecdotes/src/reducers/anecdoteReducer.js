import anecdoteServices from '../services/anecdote';

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {

    case 'UPVOTE': {
      const id = action.data.id;
      const anecdoteToUpvote = state.find((n) => n.id === id);
      const modifiedAnecdote = {
        ...anecdoteToUpvote,
        votes: anecdoteToUpvote.votes + 1
      };

      return state.map((anecdote) => {
        return anecdote.id !== id ? anecdote : modifiedAnecdote;
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
export const upvote = (id) => {
  return {
    type: 'UPVOTE',
    data: {
      id
    }
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