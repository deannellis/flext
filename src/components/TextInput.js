import React from 'react';
import { useField } from 'formik';

const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="input-group">
            {meta.touched && meta.error ? (
                <div className="text-input__error">{meta.error}</div>
            ) : (
                <div className="text-input__helper-text">{props.helperText}</div>
            )}
            <input className={`text-input ${meta.touched && meta.error ? 'text-input--error' : ''}`} {...field} {...props} />
            <label 
                htmlFor={props.id || props.name} 
                className={`text-input__label ${meta.touched && 'text-input__label--active'}`}
            >
                {label}
            </label>
        </div>
    );
}

TextInput.defaultProps = {
    helperText: ''
}
 
export default TextInput;