const initialState = {
  notificationType: '',
  content: ''
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION_UPVOTED':
      return {
        notificationType: 'upvoted',
        content: action.data.content
      };
    case 'NOTIFICATION_ADDED':
      return {
        notificationType: 'added',
        content: action.data.content
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

export const upvoteNotification = (content) => {
  return {
    type: 'NOTIFICATION_UPVOTED',
    data: {
      content
    }
  };
};

export const addedNotification = (content) => {
  return {
    type: 'NOTIFICATION_ADDED',
    data: {
      content
    }
  };
};

export const emptyNotification = () => {
  return {
    type: 'NOTIFICATION_EMPTY',
  };
};

export default notificationReducer;