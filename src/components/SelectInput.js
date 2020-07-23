import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const SelectInput = ({ label, ...props }) => {
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
			<select
				className={`select-input ${
					meta.touched && meta.error ? 'input--error' : ''
				}`}
				{...field}
				{...props}
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
SelectInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.string.isRequired,
	helperText: PropTypes.string,
};
SelectInput.defaultProps = {
	label: '',
	name: 'default-name',

	helperText: '',
};

export default SelectInput;
