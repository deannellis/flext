import React from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Button from '../components/Button';
import NumberInput from '../components/NumberInput';

export default ({ submitMacros, current }) => (
	<>
		<Formik
			initialValues={{
				protein: current ? current.protein : 0,
				carbs: current ? current.carbs : 0,
				fat: current ? current.fat : 0
			}}
			validationSchema={Yup.object({
				protein: Yup.string().required("Required"),
				carbs: Yup.string().required("Required"),
				fat: Yup.string().required("Required")
			})}
			onSubmit={(values, { setSubmitting }) => {
				const closeMenu = current ? true : false;
				submitMacros(values, closeMenu);
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