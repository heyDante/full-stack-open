const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION_UPVOTED':
      return 'upvoted';
    case 'NOTIFICATION_ADDED':
      return 'added';
    default:
      return state;
  }
};

export default notificationReducer;