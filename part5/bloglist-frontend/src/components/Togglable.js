import React, { useState } from 'react';

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
		<button onClick={() => setVisible(!visible)}>{buttonLabel}</button>
	);
};

export default Togglable;