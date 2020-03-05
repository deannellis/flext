import React, { Component } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import Button from "./Button";
import NumberInput from "./NumberInput";

class StartingWeightForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			weights: null,
			chinups: null
		};
	}

	submitWeights = weights => {
		const masterWeights = {
			...weights,
			chinups: this.state.chinups
		};
		this.props.onSubmit(masterWeights);
	};

	submitChinups = chinups => {
		this.setState({
			chinups
		});
	};

	render() {
		return (
			<>
				{this.state.chinups === null ? (
					<ChinupForm submitChinups={this.submitChinups} />
				) : (
					<WeightsForm submitWeights={this.submitWeights} />
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
		};
	}

	onNegativesChange = e => {
		const negatives = parseInt(e.target.value);
		const ups = 5 - negatives;
		if (negatives < 6) {
			this.setState({
				negatives,
				ups
			});
		}
		if (negatives > 0) {
			this.setState({ weight: 0 });
		}
	};

	onUpsChange = e => {
		const ups = parseInt(e.target.value);
		const negatives = 5 - ups;
		if (ups < 6) {
			this.setState({
				negatives,
				ups
			});
		}
		if (ups < 5) {
			this.setState({ weight: 0 });
		}
	};

	onWeightChange = e => {
		this.setState({ weight: parseInt(e.target.value) });
	};

	onSubmit = e => {
		e.preventDefault();
		const { negatives, ups, weight } = this.state;
		this.props.submitChinups({ negatives, ups, weight });
	};

	render() {
		return (
			<>
				<h2>Configure your starting Chinup reps</h2>
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
							{this.state.ups == 5
								? ""
								: "5 Chin-ups required before adding weight"}
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

export const WeightsForm = props => {
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
						max="600"
						helperText="Enter weight in pounds"
					/>
					<NumberInput
						label="Deadlift"
						name="deadlift"
						id="deadlift"
						type="number"
						min="44"
						max="600"
						helperText="Enter weight in pounds"
					/>
					<NumberInput
						label="Overhead Press"
						name="overhead"
						id="overhead"
						type="number"
						min="44"
						max="600"
						helperText="Enter weight in pounds"
					/>
					<NumberInput
						label="Row"
						name="row"
						id="row"
						type="number"
						min="44"
						max="600"
						helperText="Enter weight in pounds"
					/>
					<NumberInput
						label="Squat"
						name="squat"
						id="squat"
						type="number"
						min="44"
						max="600"
						helperText="Enter weight in pounds"
					/>
					<Button type="submit">next</Button>
				</Form>
			</Formik>
		</>
	);
};

export default StartingWeightForm;
