const initialState = {
  notificationType: 'empty'
};

let timeoutId;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        notificationType: action.notificationType,
        message: action.message
      };

    case 'CLEAR_NOTIFICATION':
      return {
        notificationType: 'empty'
      };

    default:
      return state;
  }
};

/* -- Action Creators -- */

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  };
};

export const setNotification = (notificationType, message, duration) => {
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    dispatch({
      type: 'SET_NOTIFICATION',
      notificationType,
      message
    });

    timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};

export default notificationReducer;