import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from './TextInput';
import NumberInput from './NumberInput';

// {
//     bench = 0,
//     chinup = {
//         ups: 0,
//         negatives: 5,
//         weight: 0
//     }
//     deadlift = 0,
//     overhead = 0,
//     row = 0,
//     squat = 0,
// }

const StartingWeightForm = () => {
    return (
        <>
            <h1>Enter your starting weights</h1>
            <Formik
                initialValues={{
                    bench: '',
                    deadlift: '',
                    squat: ''
                }}
                validationSchema={Yup.object({
                    bench: Yup.string()
                        .min(44, 'Must be 15 characters or less')
                        .required('Required'),
                    deadlift: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    squat: Yup.string()
                        .required('Required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                }}
            >
                <Form className="form">
                    <NumberInput 
                        label="Bench Press"
                        name="bench"
                        type="number"
                        helperText="Enter weight in pounds"
                        min="44"
                    />
                    <TextInput 
                        label="Deadlift"
                        name="deadlift"
                        type="text"
                        helperText="Enter weight in pounds"
                    />
                    <TextInput 
                        label="Squat"
                        name="squat"
                        type="text"
                        helperText="Enter weight in pounds"
                    />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    )
};

export default StartingWeightForm;