import React from 'react';

const Button = (props) => {
    return (
        <button className={`button ${props.variant ? 'button--' + props.variant : ''} ${props.disabled ? 'button--disabled' : ''}`} >
            {props.children}
        </button>
    );
}

Button.defaultProps = {
    disabled: false
}
 
export default Button;