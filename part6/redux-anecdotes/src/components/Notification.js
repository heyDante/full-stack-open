import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  return (
    notification.notificationType
      ?
      <div className="notification">
        You <strong>{notification.notificationType}, </strong>
        {notification.content}
      </div>
      : null
  // <div className="notification">hakjghakghajkghakhgkjh</div>
  );
};

export default Notification;