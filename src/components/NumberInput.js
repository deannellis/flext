import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const NumberInput = ({ label, ...props }) => {
	const inputProps = { ...props };
	delete inputProps.helperText;
	const [field, meta] = useField(props);
	const { name, helperText, id } = props;
	return (
		<div className="input-group">
			{meta.touched && meta.error ? (
				<div className="input__error" data-testid={`errors-${name}`}>
					{meta.error}
				</div>
			) : (
				<div className="input__helper-text">{helperText}</div>
			)}
			<input
				className={`number-input ${
					meta.touched && meta.error ? 'input--error' : ''
				}`}
				{...field}
				{...inputProps}
			/>
			<label
				htmlFor={id || name}
				className={`label ${meta.touched && 'label--active'}`}
			>
				{label}
			</label>
		</div>
	);
};
NumberInput.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	helperText: PropTypes.string,
	id: PropTypes.string.isRequired,
};
NumberInput.defaultProps = {
	label: '',
	type: 'number',
	name: 'default-name',
	helperText: '',
};

export default NumberInput;
