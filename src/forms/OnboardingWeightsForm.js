import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Button from '../components/Button';
import NumberInput from '../components/NumberInput';

const OnboardingWeightsForm = ({ submitWeights }) => {
	const maxMessage = 'Weight can not exceed 1000lbs tough guy';
	const minMessage = 'Weight must be greater than bar weight (44 lbs)';
	return (
		<>
			<h2>Enter your starting weights</h2>
			<Formik
				initialValues={{
					bench: 44,
					deadlift: 44,
					overhead: 44,
					row: 44,
					squat: 44,
				}}
				validationSchema={Yup.object({
					bench: Yup.number()
						.required('Required')
						.max(1000, maxMessage)
						.min(44, minMessage),
					deadlift: Yup.number()
						.required('Required')
						.max(1000, maxMessage)
						.min(44, minMessage),
					overhead: Yup.number()
						.required('Required')
						.max(1000, maxMessage)
						.min(44, minMessage),
					row: Yup.number()
						.required('Required')
						.max(1000, maxMessage)
						.min(44, minMessage),
					squat: Yup.number()
						.required('Required')
						.max(1000, maxMessage)
						.min(44, minMessage),
				})}
				onSubmit={(values, { setSubmitting }) => {
					submitWeights(values);
					setSubmitting(false);
				}}
			>
				<Form className="form">
					<NumberInput
						label="Bench Press"
						name="bench"
						id="bench"
						type="number"
						min="44"
						max="1000"
						helperText="Enter weight in pounds"
					/>
					<NumberInput
						label="Deadlift"
						name="deadlift"
						id="deadlift"
						type="number"
						min="44"
						max="1000"
						helperText="Enter weight in pounds"
					/>
					<NumberInput
						label="Overhead Press"
						name="overhead"
						id="overhead"
						type="number"
						min="44"
						max="1000"
						helperText="Enter weight in pounds"
					/>
					<NumberInput
						label="Row"
						name="row"
						id="row"
						type="number"
						min="44"
						max="1000"
						helperText="Enter weight in pounds"
					/>
					<NumberInput
						label="Squat"
						name="squat"
						id="squat"
						type="number"
						min="44"
						max="1000"
						helperText="Enter weight in pounds"
					/>
					<Button type="submit">next</Button>
				</Form>
			</Formik>
		</>
	);
};
OnboardingWeightsForm.propTypes = {
	submitWeights: PropTypes.func.isRequired,
};

export default OnboardingWeightsForm;
