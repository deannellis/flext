import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Button from '../components/Button';
import SelectInput from '../components/SelectInput';
import NumberInput from '../components/NumberInput';

const UpdateMacroForm = ({ updateMacro, closeForm }) => (
	<>
		<Formik
			initialValues={{
				macro: '',
				amount: 0,
			}}
			validationSchema={Yup.object({
				macro: Yup.string().required('Required'),
				amount: Yup.number().required('Required').min(0),
			})}
			onSubmit={(values, { setSubmitting }) => {
				updateMacro(values);
				setSubmitting(false);
			}}
		>
			<Form className="form">
				<SelectInput label="Macro" name="macro" id="macro">
					<option value="">Select a macro</option>
					<option value="protein">protein</option>
					<option value="fat">fat</option>
					<option value="carbs">carbs</option>
				</SelectInput>
				<NumberInput
					label="Amount"
					name="amount"
					id="amount"
					type="number"
					min="0"
					helperText="Enter amount in grams"
				/>
				<Button variant="primary" type="submit">
					submit
				</Button>
				<Button type="button" clickHandler={closeForm}>
					cancel
				</Button>
			</Form>
		</Formik>
	</>
);
UpdateMacroForm.propTypes = {
	updateMacro: PropTypes.func.isRequired,
	closeForm: PropTypes.func.isRequired,
};

export default UpdateMacroForm;
