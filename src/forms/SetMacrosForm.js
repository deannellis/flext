import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Button from '../components/Button';
import NumberInput from '../components/NumberInput';

const SetMacrosForm = ({ submitMacros, current }) => (
	<>
		<Formik
			initialValues={{
				protein: current.protein,
				carbs: current.carbs,
				fat: current.fat
			}}
			validationSchema={Yup.object({
				protein: Yup.number()
					.required('Required')
					.min(0),
				carbs: Yup.number()
					.required('Required')
					.min(0),
				fat: Yup.number()
					.required('Required')
					.min(0)
			})}
			onSubmit={(values, { setSubmitting }) => {
				submitMacros(values, !!current);
				setSubmitting(false);
			}}
		>
			<Form className="form">
				<NumberInput
					label="Protein"
					name="protein"
					type="number"
					min="0"
					helperText="Enter protein in grams"
				/>
				<NumberInput
					label="Carbs"
					name="carbs"
					type="number"
					min="0"
					helperText="Enter carbs in grams"
				/>
				<NumberInput
					label="Fat"
					name="fat"
					type="number"
					min="0"
					helperText="Enter fat in grams"
				/>
				<Button type="submit">submit</Button>
			</Form>
		</Formik>
	</>
);
SetMacrosForm.propTypes = {
	submitMacros: PropTypes.func.isRequired,
	current: PropTypes.shape({
		protein: PropTypes.number,
		carbs: PropTypes.number,
		fat: PropTypes.number
	})
};
SetMacrosForm.defaultProps = {
	current: {
		protein: 0,
		carbs: 0,
		fat: 0
	}
};

export default SetMacrosForm;
