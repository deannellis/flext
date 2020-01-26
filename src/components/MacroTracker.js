import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from './Button';
import NumberInput from './NumberInput';

const MacroTracker = ({ macros, updateMacros }) => {
    const { target, current } = macros;
    const targetKeys = Object.keys(target);
    return (
        <div className="macro-tracker">
            <h2>Macros</h2>
            {target.protein === null ? (
                <>
                    <p>Enter Your Macros</p>
                    <p className="macro-tracker__helper-text">Not sure what your macros are? There are <a href="https://www.google.com/search?q=calculating+macros+for+muscle+gain" target="blank">several calculators</a> online.</p>
                    <MacroForm submitMacros={macros => {updateMacros(macros)}}/>
                </>
            ) : (
                <>
                    <p>Your Daily Macros</p>
                    {targetKeys.map((macro, i) => (
                        <p>{`${macro}: ${target[macro]} grams`}</p>
                    ))}
                </>
            )}
        </div>
    );
}

const MacroForm = ({ submitMacros }) => (
    <>
        <Formik
            initialValues={{
                protein: 0,
                carbs: 0,
                fat: 0,
            }}
            validationSchema={Yup.object({
                protein: Yup.string()
                    .required('Required'),
                carbs: Yup.string()
                    .required('Required'),
                fat: Yup.string()
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                submitMacros(values);
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
)
 
export default MacroTracker;