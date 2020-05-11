import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  return (
    notification.notificationType
      ?
      <div className="notification active">
        You <strong>{notification.notificationType}, </strong>
        {notification.content}
      </div>
      : null
  );
};

export default Notification;