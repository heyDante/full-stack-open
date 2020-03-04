import React from 'react';

import './Notification.css';

const Notification = ({ notificationObject }) => {
  const { type } = notificationObject;

  if (type === 'created') {
    const { title, author } = notificationObject;
    return (
      <div className={`notification-box ${type}`}>
        Added
        <span> {title} </span>
        by 
        <span> {author}</span>
      </div>
    );
  }

  if (type === 'loggedIn') {
    const { user } = notificationObject;
    return (
      <div className={`notification-box ${type}`}>
        <span>{user}</span> logged in
      </div>
    );
  }

  if (type === 'loggedOut') {
    return (
      <div className={`notification-box ${type}`}>
        Succesfully logged out!
      </div>
    );
  }

  if (type === 'error') {
    const { message } = notificationObject;
    return (
      <div className={`notification-box ${type}`}>
        {message}
      </div>
    );
  }

  return null;
};

export default Notification;