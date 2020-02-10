import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { getDisplayName, roundWeight } from '../utils/workout';
import Button from './Button';
import NumberInput from './NumberInput';

const LiftCard = ({ lift, weights, formIsOpen, toggleForm, updateWeight }) => {
    return (
        <div className="card lift-card" style={{'minHeight': '30.8rem'}}>
            <div>
                <h2>{getDisplayName(lift)}</h2>
                    <p>Work Weight:</p>
                <div className="lift-card__weight">
                    <p>
                        {roundWeight(weights[lift])}
                        <span>lbs</span>
                    </p>
                </div>
            </div>
            <Button clickHandler={toggleForm}>Edit weight</Button>
            <div className={formIsOpen ? 'card__overlay' : 'card__overlay  card__overlay--hidden' }>
                <UpdateWeightForm 
                    currentWeight={weights[lift]}
                    lift={lift}
                    toggleForm={toggleForm}
                    updateWeight={updateWeight}
                />
            </div>
        </div>
    );
}

LiftCard.defaultProps = {
    lift: 'bench',
    weights: {
        bench: 0,
        row: 0,
        squat: 0,
        deadlift: 0,
        overhead: 0,
    },
    formIsOpen: false,
    toggleForm: () => {console.log('toggle form (default prop)')},
    updateWeight: () => {console.log('update weight (default prop)')},
};
 
export default LiftCard;

const UpdateWeightForm = ({ currentWeight, lift, toggleForm, updateWeight }) => (
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
                    min="0"
                    helperText="Enter amount in pounds"
                />
                <Button variant="primary" type="submit">submit</Button>
                <Button type="button" clickHandler={toggleForm}>cancel</Button>
            </Form>
        </Formik>
    </>
)