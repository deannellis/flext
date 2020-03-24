import React, { Component } from "react";
import Button from "../components/Button";

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
		this.setState({
			negatives,
			ups
		});
		if (negatives > 5) {
			this.setState({
				negatives: 5,
				ups: 0
			});
		}
	};

	onUpsChange = e => {
		const ups = parseInt(e.target.value);
		const negatives = 5 - ups;
		this.setState({
			negatives,
			ups
		});
		if (ups > 5) {
			this.setState({
				negatives: 0,
				ups
			});
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
							required
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
							required
						/>
						<label className="label">Chin-ups</label>
					</div>
					<div className="input-group">
						<div className="input__helper-text">
							{this.state.ups < 5
								? ""
								: "5 Chin-ups required before adding weight"}
						</div>
						<input
							type="number"
							min="0"
							value={this.state.weight}
							onChange={this.onWeightChange}
							disabled={this.state.ups < 5}
							className="number-input"
							required
						/>
						<label className="label">Weight</label>
					</div>
					<Button type="submit">submit</Button>
				</form>
			</>
		);
	}
}

export default ChinupForm;

