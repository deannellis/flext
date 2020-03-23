import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Button from "../components/Button";
import NumberInput from "../components/NumberInput";

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
					bench: Yup.number()
						.required("Required")
						.max(1000, "Weight can not exceed 1000lbs tough guy")
						.min(44, "Weight must be greater than bar weight"),
					deadlift: Yup.number()
						.required("Required")
						.max(1000, "Weight can not exceed 1000lbs tough guy")
						.min(44, "Weight must be greater than bar weight"),
					overhead: Yup.number()
						.required("Required")
						.max(1000, "Weight can not exceed 1000lbs tough guy")
						.min(44, "Weight must be greater than bar weight"),
					row: Yup.number()
						.required("Required")
						.max(1000, "Weight can not exceed 1000lbs tough guy")
						.min(44, "Weight must be greater than bar weight"),
					squat: Yup.number()
						.required("Required")
						.max(1000, "Weight can not exceed 1000lbs tough guy")
						.min(44, "Weight must be greater than bar weight")
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
