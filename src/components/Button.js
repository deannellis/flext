import React from 'react';

const Button = ({ variant, disabled, type, clickHandler, children }) => {
    return (
        <button 
            className={`button ${variant ? 'button--' + variant : ''} ${disabled ? 'button--disabled' : ''}`}
            type={type}
            onClick={clickHandler}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    disabled: false,
    type: 'button',
    onClick: () => {console.log('button clicked')}
}
 
export default Button;