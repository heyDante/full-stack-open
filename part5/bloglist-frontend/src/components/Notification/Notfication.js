import React from 'react';
import { useSelector } from 'react-redux';

import './Notification.css';

const Notification = () => {
  const { notificationType, message } = useSelector(state => state.notification);

  if (notificationType === 'empty') {
    return null;
  }

  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;