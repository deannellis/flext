import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Button from '../components/Button';
import NumberInput from '../components/NumberInput';
import { getDisplayName } from '../utils/workout';

export default ({ currentWeight, lift, toggleForm, updateWeight }) => (
    <>
        <Formik
            initialValues={{
                [lift]: currentWeight
            }}
            validationSchema={Yup.object({
                [lift]: Yup.string()
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                updateWeight(values);
                toggleForm();
                setSubmitting(false);
            }}
        >
            <Form className="form">
                <p>{`Update ${getDisplayName(lift)} Weight`}</p>
                <NumberInput 
                    label="New Weight"
                    name={lift}
                    type="number"
                    min="44"
                    helperText="Enter amount in pounds"
                />
                <Button variant="primary" type="submit">submit</Button>
                <Button type="button" clickHandler={toggleForm}>cancel</Button>
            </Form>
        </Formik>
    </>
);