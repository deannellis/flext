import React from 'react';
import { useField } from 'formik';

const NumberInput = ({ label, ...props }) => {
    const inputProps = { ...props };
    delete inputProps.helperText;
    const [field, meta] = useField(props);
    return (
        <div className="input-group">
            {meta.touched && meta.error ? (
                <div className="input__error">{meta.error}</div>
            ) : (
                <div className="input__helper-text">{props.helperText}</div>
            )}
            <input className={`number-input ${meta.touched && meta.error ? 'input--error' : ''}`} {...field} {...inputProps} />
            <label 
                htmlFor={props.id || props.name} 
                className={`label ${meta.touched && 'label--active'}`}
            >
                {label}
            </label>
        </div>
    );
}
 
export default NumberInput;