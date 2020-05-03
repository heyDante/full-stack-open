import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = ({ buttonLabel, children }) => {
  const [ visible, setVisible ] = useState(false);

  if (visible) {
    return (
      <div>
        {children}
        <button onClick={() => setVisible(!visible)}>cancel</button>
      </div>
    );
  }

  return (
    <button id="button-label" onClick={() => setVisible(!visible)}>{buttonLabel}</button>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

export default Togglable;