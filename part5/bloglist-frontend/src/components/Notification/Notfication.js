import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Notification = () => {
  const { notificationType, message } = useSelector(state => state.notification);

  if (notificationType === 'empty') {
    return null;
  }

  return (
    <NotificationStyled>
      {message}
    </NotificationStyled>
  );
};

const NotificationStyled = styled.div`
  font-size: 14px;
  padding: 1em 2em;
  border-radius: 5px;
  background-color: hsl(120, 79%, 92%);
  color: hsl(120, 58%, 21%);
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  text-transform: capitalize;
`;

export default Notification;