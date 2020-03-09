import React from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Button from '../components/Button';
import NumberInput from '../components/NumberInput';

export default props => {
	return (
		<>
			<h2>Enter your starting weights</h2>
			<Formik
				initialValues={{
					bench: 44,
					deadlift: 44,
					overhead: 44,
					row: 44,
					squat: 44
				}}
				validationSchema={Yup.object({
					bench: Yup.string().required("Required"),
					deadlift: Yup.string().required("Required"),
					overhead: Yup.string().required("Required"),
					row: Yup.string().required("Required"),
					squat: Yup.string().required("Required")
				})}
				onSubmit={(values, { setSubmitting }) => {
					props.submitWeights(values);
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
						helperText="Enter weight in pounds"
					/>
					<NumberInput
						label="Deadlift"
						name="deadlift"
						id="deadlift"
						type="number"
						min="44"
						helperText="Enter weight in pounds"
					/>
					<NumberInput
						label="Overhead Press"
						name="overhead"
						id="overhead"
						type="number"
						min="44"
						helperText="Enter weight in pounds"
					/>
					<NumberInput
						label="Row"
						name="row"
						id="row"
						type="number"
						min="44"
						helperText="Enter weight in pounds"
					/>
					<NumberInput
						label="Squat"
						name="squat"
						id="squat"
						type="number"
						min="44"
						helperText="Enter weight in pounds"
					/>
					<Button type="submit">next</Button>
				</Form>
			</Formik>
		</>
	);
};