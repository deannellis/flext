import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ variant, disabled, type, clickHandler, children }) => {
	return (
		<button
			className={`button ${variant ? 'button--' + variant : ''} ${
				disabled ? 'button--disabled' : ''
			}`}
			type={type}
			onClick={clickHandler}
		>
			{children}
		</button>
	);
};
Button.propTypes = {
	variant: PropTypes.string,
	disabled: PropTypes.bool,
	type: PropTypes.string,
	clickHandler: PropTypes.func,
	children: PropTypes.node
};
Button.defaultProps = {
	disabled: false,
	type: 'button',
	clickHandler: () => {
		console.log('button clicked');
	},
	variant: '',
	children: ''
};

export default Button;
