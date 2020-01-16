import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from './TextInput';
import Button from './Button';
import NumberInput from './NumberInput';

class StartingWeightForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weights: null,
            chinups: {}
        }
    }

    submitWeights = (weights) => {
        this.setState({
            weights
        });
    }

    submitChinups = (chinups) => {
        const masterWeights = {
            ...this.state.weights,
            chinups
        }
        // console.log(masterWeights);
        this.props.onSubmit(masterWeights);
    }

    render() { 
        return (
            <>
                {this.state.weights === null ? (
                    <WeightsForm submitWeights={this.submitWeights}/>
                ) : (
                    <ChinupForm submitChinups={this.submitChinups}/>
                )}
            </>
        );
    }
}

class ChinupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ups: 0,
            negatives: 5,
            weight: 0
        }
    }
    
    onNegativesChange = (e) => {
        const negatives = parseInt(e.target.value);
        const ups = 5 - negatives;
        this.setState({
            negatives,
            ups
        });
    }
    
    onUpsChange = (e) => {
        const ups = parseInt(e.target.value);
        const negatives = 5 - ups;
        this.setState({
            negatives,
            ups
        });
    }

    onWeightChange = (e) => {this.setState({ weight: parseInt(e.target.value) })}

    onSubmit = (e) => {
        e.preventDefault();
        const { negatives, ups, weight } = this.state;
        this.props.submitChinups({ negatives, ups, weight });
    }

    render() { 
        return (
            <>
                <h1>Configure your starting Chinup reps</h1>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="input-group">
                        <div className="input__error"></div>
                        <input 
                            type="number" 
                            max="5" 
                            min="0" 
                            value={this.state.negatives} 
                            onChange={this.onNegativesChange} 
                            className="number-input"
                        />
                        <label className="label">Negatives</label>
                    </div>
                    <div className="input-group">
                        <div className="input__error"></div>
                        <input 
                            type="number" 
                            max="5" 
                            min="0" 
                            value={this.state.ups} 
                            onChange={this.onUpsChange} 
                            className="number-input"
                        />
                        <label className="label">Chin-ups</label>
                    </div>
                    <div className="input-group">
                        <div className="input__helper-text">
                            { this.state.ups == 5 ? '' : '5 Chin-ups required before adding weight'}
                        </div>
                        <input 
                            type="number" 
                            min="0" 
                            value={this.state.weight} 
                            onChange={this.onWeightChange} 
                            disabled={this.state.ups !== 5} 
                            className="number-input"
                        />
                        <label className="label">Weight</label>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </>
        );
    }
}

const WeightsForm = (props) => {
    return (
        <>
            <h1>Enter your starting weights</h1>
            <Formik
                initialValues={{
                    bench: 44,
                    deadlift: 44,
                    overhead: 44,
                    row: 44,
                    squat: 44
                }}
                validationSchema={Yup.object({
                    bench: Yup.string()
                        .required('Required'),
                    deadlift: Yup.string()
                        .required('Required'),
                    overhead: Yup.string()
                        .required('Required'),
                    row: Yup.string()
                        .required('Required'),
                    squat: Yup.string()
                        .required('Required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    //   alert(JSON.stringify(values, null, 2));
                        props.submitWeights(values);
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form className="form">
                    <NumberInput 
                        label="Bench Press"
                        name="bench"
                        type="number"
                        min="44"
                        helperText="Enter weight in pounds"
                    />
                    <TextInput 
                        label="Deadlift"
                        name="deadlift"
                        type="number"
                        min="44"
                        helperText="Enter weight in pounds"
                    />
                    <TextInput 
                        label="Overhead Press"
                        name="overhead"
                        type="number"
                        min="44"
                        helperText="Enter weight in pounds"
                    />
                    <TextInput 
                        label="Row"
                        name="row"
                        type="number"
                        min="44"
                        helperText="Enter weight in pounds"
                    />
                    <TextInput 
                        label="Squat"
                        name="squat"
                        type="number"
                        min="44"
                        helperText="Enter weight in pounds"
                    />
                    <Button type="submit">next</Button>
                </Form>
            </Formik>
        </>
    )
};

export default StartingWeightForm;