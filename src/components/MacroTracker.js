import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from './Button';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';
import PieChart from './PieChartXX';

class MacroTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayUpdateForm: false,
        }
        // this.onSubmitMacros = this.onSubmitMacros.bind(this);
    }

    onSubmitMacros = macros => {
        this.setState({ displayUpdateForm: false });
        this.props.updateMacro(macros);
    }

    render() { 
        const { target, current } = this.props.macros;
        delete current.day;
        const targetKeys = Object.keys(target);
        let pieData = []

        for(let key in current) {
            let item = {}
            item.macro = key;
            if(current[key] !== null) {
                item.amount = current[key]
            } else {
                item.amount = 0;
            }
            pieData.push(item);
        }
        
        return (
            <div className="macro-tracker">
                <h2>Macros</h2>
                {target.protein === null ? (
                    <>
                        <p>Enter Your Macros</p>
                        <p className="macro-tracker__helper-text">Not sure what your macros are? There are <a href="https://www.google.com/search?q=calculating+macros+for+muscle+gain" target="blank">several calculators</a> online.</p>
                        <SetMacroForm submitMacros={macros => {this.props.setMacros(macros)}}/>
                    </>
                ) : (
                    <>
                        <PieChart data={getPieSlices(target, current)} />
                        <div className="macro-tracker__macros">
                            {targetKeys.map((macro, i) => (
                                <div className="macro-tracker__macro" key={i}>
                                    <div className="macro-tracker__macro-key" id={'macro-key-' + i}></div>
                                    <p> 
                                        <span>{macro}</span>
                                        {` ${current[macro]} of ${target[macro]} grams`}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <Button 
                            clickHandler={ () => { this.setState({ displayUpdateForm: true }) } }
                        >Add macros</Button>
                    </>
                )}
                <div className={this.state.displayUpdateForm ? 'macro-tracker__update-form' : 'macro-tracker__update-form macro-tracker__update-form--hidden'}>
                    <UpdateMacroForm updateMacro={this.onSubmitMacros} closeForm={() => {
                        this.setState({ displayUpdateForm: false })
                    }} />
                </div>
            </div>
        );
    }
}

const getPieSlices = (target, current) => {
    let leftover = 0;
    let pieData = []

    for(let key in current) {
        let item = {}
        item.macro = key;
        if(current[key] !== null) {
            if(current[key] <= target[key]) {
                item.amount = current[key]
                const diff = target[key] - current[key];
                leftover = leftover + diff;
            } else {
                item.amount = target[key]
            }
        } else {
            item.amount = 0;
        }
        pieData.push(item);
    }
    if(leftover !== 0) {
        const leftoverObject = {
            macro: 'leftover',
            amount: leftover
        }
        pieData.push(leftoverObject)
    }
    return pieData;
}

const UpdateMacroForm = ({ updateMacro, closeForm }) => (
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
                <Button variant="primary" type="submit">submit</Button>
                <Button type="button" clickHandler={closeForm}>cancel</Button>
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