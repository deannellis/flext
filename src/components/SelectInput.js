import React from 'react';
import { useField } from 'formik';

const SelectInput = ({ label, ...props  }) => {
    const [ field, meta ] = useField(props);
    return (
        <div className="input-group">
            {meta.touched && meta.error ? (
                <div className="input__error">{meta.error}</div>
            ) : (
                <div className="input__helper-text">{props.helperText}</div>
            )}
            <select className={`select-input ${meta.touched && meta.error ? 'input--error' : ''}`} {...field} {...props} />
            <label 
                htmlFor={props.id || props.name} 
                className={`label ${meta.touched && 'label--active'}`}
            >
                {label}
            </label>
        </div>
    );
}
 
export default SelectInput;