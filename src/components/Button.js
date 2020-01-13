import React from 'react';

const Button = (props) => {
    return (
        <button 
            className={`button ${props.variant ? 'button--' + props.variant : ''} ${props.disabled ? 'button--disabled' : ''}`}
            type={props.type}
            onClick={props.clickHandler}
        >
            {props.children}
        </button>
    );
}

Button.defaultProps = {
    disabled: false,
    type: 'button',
    onClick: () => {console.log(`${props.children} clicked`)}
}
 
export default Button;