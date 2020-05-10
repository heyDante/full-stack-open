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
      const content = action.data.content;
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
  return {
    type: 'ADD_ANECDOTE',
    data: {
      content
    }
  };
};

export const initializeAnecdotes = () => {
  // return {
  //   type: 'INTIALIZE_ANECDOTES',
  //   data
  // };
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll();
    dispatch({
      type: 'INTIALIZE_ANECDOTES',
      data: anecdotes
    });
  };
};

export default reducer;