import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from './Button';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';

const MacroTracker = ({ macros, setMacros, updateMacro }) => {
    const { target, current } = macros;
    const targetKeys = Object.keys(target);
    return (
        <div className="macro-tracker">
            <h2>Macros</h2>
            {target.protein === null ? (
                <>
                    <p>Enter Your Macros</p>
                    <p className="macro-tracker__helper-text">Not sure what your macros are? There are <a href="https://www.google.com/search?q=calculating+macros+for+muscle+gain" target="blank">several calculators</a> online.</p>
                    <SetMacroForm submitMacros={macros => {setMacros(macros)}}/>
                </>
            ) : (
                <>
                    <p>Your Daily Macros</p>
                    {targetKeys.map((macro, i) => (
                        <p key={i}>{`${macro}: ${target[macro]} grams`}</p>
                    ))}
                    <UpdateMacroForm updateMacro={update => {updateMacro(update)}} />
                </>
            )}
        </div>
    );
}

const UpdateMacroForm = ({ updateMacro }) => (
    <>
        <Formik
            initialValues={{
                macro: '',
                amount: 0,
            }}
            validationSchema={Yup.object({
                macro: Yup.string()
                    .required('Required'),
                amount: Yup.string()
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                updateMacro(values);
                setSubmitting(false);
            }}
        >
            <Form className="form">
                <SelectInput 
                    label="Macro"
                    name="macro"
                >
                    <option value="">Select a macro</option>
                    <option value="protein">protein</option>
                    <option value="fat">fat</option>
                    <option value="carbs">carbs</option>
                </SelectInput>
                <NumberInput 
                    label="Amount"
                    name="amount"
                    type="number"
                    min="0"
                    helperText="Enter amount in grams"
                />
                <Button type="submit">submit</Button>
            </Form>
        </Formik>
    </>
)

const SetMacroForm = ({ submitMacros }) => (
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