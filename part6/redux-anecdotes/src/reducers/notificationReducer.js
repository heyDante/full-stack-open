const initialState = {
  notificationType: '',
  content: ''
};

let timerId;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION_UPVOTED':
      return {
        notificationType: 'upvoted',
        content: action.data
      };
    case 'NOTIFICATION_ADDED':
      return {
        notificationType: 'added',
        content: action.data
      };
    case 'NOTIFICATION_EMPTY':
      return {
        notificationType: '',
        content: ''
      };
    default:
      return state;
  }
};

export const upvoteNotification = (content, duration) => {
  return async (dispatch) => {
    if(timerId) {
      dispatch(emptyNotification());
    }

    dispatch({
      type: 'NOTIFICATION_UPVOTED',
      data: content
    });

    /* -- timer is defined in the global scope -- */
    timerId = setTimeout(() => {
      dispatch(emptyNotification());
    }, duration * 1000);
  };
};

export const addedNotification = (content, duration) => {
  return async (dispatch) => {
    if(timerId) {
      dispatch(emptyNotification());
    }

    dispatch({
      type: 'NOTIFICATION_ADDED',
      data: content
    });

    /* -- timer is defined in the global scope -- */
    timerId = setTimeout(() => {
      dispatch(emptyNotification());
    }, duration * 1000);

  };

};

export const emptyNotification = () => {
  return {
    type: 'NOTIFICATION_EMPTY',
  };
};

export default notificationReducer;