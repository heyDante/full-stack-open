import blogService from '../services/blogs';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...action.data
      };

    case 'LOG_OUT':
      return null;

    default:
      return state;
  }
};

export const loginUser = (userDetails) => {
  return (dispatch) => {
    dispatch({
      type: 'LOG_IN',
      data: userDetails
    });
    blogService.setToken(userDetails.token);
  };
};

export const logoutUser = () => {
  return {
    type: 'LOG_OUT'
  };
};

export default userReducer;