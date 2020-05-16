import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Togglable = ({ buttonLabel, children }) => {
  const [ visible, setVisible ] = useState(false);

  if (visible) {
    return (
      <TogglableContainer>
        <ButtonCancel onClick={() => setVisible(!visible)}>cancel</ButtonCancel>
        {children}
      </TogglableContainer>
    );
  }

  return (
    <TogglableContainer>
      <ButtonCreate id="button-label" onClick={() => setVisible(!visible)}>{buttonLabel}</ButtonCreate>
    </TogglableContainer>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

const ButtonCancel = styled.button`
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  margin-top: 1em;
  margin-bottom: 1.4em;
  border-radius: 50%;
  outline: none;
  font-size: 11px;
  border: none;
  border-radius: 5px;
  color: #006685;
  background-color: #d6edf5;
  padding: 6px 12px;
`;

const ButtonCreate = styled(ButtonCancel)`
  font-size: 11px;
  border: none;
  border-radius: 5px;
  color: #006685;
  background-color: #d6edf5;
  padding: 6px 12px;
`;

const TogglableContainer = styled.div`
  margin: 0.9em 1.2em 1.3em 1.2em;

  form {
    margin-bottom: 2em;
  }
`;

export default Togglable;