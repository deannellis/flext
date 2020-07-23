import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ variant, disabled, type, clickHandler, children }) => {
	return (
		/* eslint-disable react/button-has-type */
		<button
			className={`button ${variant ? `button--${variant}` : ''} ${
				disabled ? 'button--disabled' : ''
			}`}
			type={type}
			onClick={clickHandler}
		>
			{children}
		</button>
		/* eslint-enable react/button-has-type */
	);
};
Button.propTypes = {
	variant: PropTypes.string,
	disabled: PropTypes.bool,
	type: PropTypes.string,
	clickHandler: PropTypes.func.isRequired,
	children: PropTypes.node,
};
Button.defaultProps = {
	disabled: false,
	type: 'button',
	variant: '',
	children: '',
};

export default Button;
