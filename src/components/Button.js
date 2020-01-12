import React from 'react';

const Button = (props) => {
    return (
        <button 
            className={`button ${props.variant ? 'button--' + props.variant : ''} ${props.disabled ? 'button--disabled' : ''}`}
            type={props.type}
        >
            {props.children}
        </button>
    );
}

Button.defaultProps = {
    disabled: false,
    type: 'button'
}
 
export default Button;