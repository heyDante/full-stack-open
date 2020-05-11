const initialState = {
  notificationType: '',
  content: ''
};

export let timeoutId;

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
  return (dispatch) => {
    dispatch({
      type: 'NOTIFICATION_UPVOTED',
      data: content
    });

    /* -- timer is defined in the global scope -- */
    timeoutId = setTimeout(() => {
      dispatch(emptyNotification());
    }, duration * 1000);
  };
};

export const addedNotification = (content, duration) => {
  return (dispatch) => {
    if(timeoutId) {
      dispatch(emptyNotification());
    }

    dispatch({
      type: 'NOTIFICATION_ADDED',
      data: content
    });

    /* -- timer is defined in the global scope -- */
    timeoutId = setTimeout(() => {
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