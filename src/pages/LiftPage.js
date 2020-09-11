import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { updateWorkout } from '../actions/inProgressWorkout';
import {
	getDisplayName,
	getWarmupWeights,
	getWeightDistribution,
} from '../utils/workout';
import { LeftArrowIcon } from '../utils/icons';
import Button from '../components/Button';
import MenuContext from '../context/menu-context';

export class LiftPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { setPageMenu } = this.context;
		setPageMenu(false);
	}

	componentWillUnmount() {
		const { setPageMenu } = this.context;
		setPageMenu(true);
	}

	completeLift = (result) => {
		const { match, dispatch, history } = this.props;
		const liftResult = { updates: { [match.params.id]: result } };
		dispatch(updateWorkout(liftResult));
		history.push('/workout');
	};

	render() {
		const { match, masterWeights, history } = this.props;
		const { id } = match.params;
		const workWeight = masterWeights[id];
		const workReps = ['5 reps', '5 reps', 'AMRAP*'];
		const { negatives, ups, chinupWeight } = masterWeights.chinup;
		/* eslint-disable react/no-array-index-key */
		return (
			<div className="lift-page__wrapper">
				<div className="lift-page">
					<div className="lift-page__card card">
						<h2>{getDisplayName(id)}</h2>
						{id === 'chinup' ? (
							<div>
								<h3>Complete:</h3>
								<p className="lift-page__chinup-title">3 sets of</p>
								<div className="lift-page__chinups">
									{negatives === 0 ? (
										''
									) : (
										<div className="lift-page__chinup">
											<p>{negatives}</p>
											<span>negatives</span>
										</div>
									)}
									{ups === 0 ? (
										''
									) : (
										<div className="lift-page__chinup">
											<p>{ups}</p>
											<span>chin-ups</span>
										</div>
									)}
									{chinupWeight === 0 ? (
										''
									) : (
										<div className="lift-page__chinup">
											<p>{chinupWeight}</p>
											<span>lbs</span>
										</div>
									)}
								</div>
								<h3>Enter your results:</h3>
								<p>Were you able to complete all sets and reps?</p>
								<Button
									variant="primary"
									clickHandler={() => {
										this.completeLift(1);
									}}
								>
									Yes
								</Button>
								<Button
									clickHandler={() => {
										this.completeLift(0);
									}}
								>
									No
								</Button>
							</div>
						) : (
							<>
								<div className="lift-page__tables">
									<div id="warm-up" className="lift-page__table">
										<h3>Warm-Up</h3>
										{getWarmupWeights(workWeight).map((weight, i) => (
											<div key={i} className="lift-page__sets">
												<div className="lift-page__set">
													<span>
														Set
														{i + 1}
													</span>
													<p>5 reps @{Math.round(weight)}lbs</p>
												</div>
												<div className="lift-page__distributed">
													{getWeightDistribution(weight).map(
														(distWeight, j) => (
															<div
																key={j}
																className="lift-page__distributed-item"
															>
																<span>
																	{j === 0 && 'LEFT'}
																	{j === 1 && 'BAR'}
																	{j === 2 && 'RIGHT'}
																</span>
																<p>{Math.round(distWeight)}</p>
															</div>
														)
													)}
												</div>
											</div>
										))}
									</div>
									<div className="lift-page__table">
										<h3>Work</h3>
										{workReps.map((rep, i) => (
											<div key={i} className="lift-page__sets">
												<div className="lift-page__set">
													<span>Set {i + 1}</span>
													<p>
														{rep} @{workWeight}lbs
													</p>
												</div>
												<div className="lift-page__distributed">
													{getWeightDistribution(workWeight).map(
														(distWeight, k) => (
															<div
																key={k}
																className="lift-page__distributed-item"
															>
																<span>
																	{k === 0 && 'LEFT'}
																	{k === 1 && 'BAR'}
																	{k === 2 && 'RIGHT'}
																</span>
																<p>{distWeight}</p>
															</div>
														)
													)}
												</div>
											</div>
										))}
									</div>
								</div>
								<p>*as many reps as possible </p>
								<h3 className="lift-page__results-title">Enter your results</h3>
								<p>On your last set how many reps did you complete?</p>
								<Button
									clickHandler={() => {
										this.completeLift(0);
									}}
								>
									Less than 5
								</Button>
								<Button
									clickHandler={() => {
										this.completeLift(1);
									}}
								>
									Greater than 5
								</Button>
								<Button
									clickHandler={() => {
										this.completeLift(2);
									}}
								>
									Greater than 10
								</Button>
							</>
						)}
					</div>
					<button
						className="lift-page__action-button action-button"
						type="button"
						onClick={() => {
							history.goBack();
						}}
					>
						<LeftArrowIcon fill="rgba(26, 33, 46, .84)" size={24} />
						<span>Back</span>
					</button>
				</div>
			</div>
			/* eslint-ensable react/no-array-index-key */
		);
	}
}
LiftPage.contextType = MenuContext;
LiftPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.object,
	}),
	masterWeights: PropTypes.shape({
		bench: PropTypes.number,
		row: PropTypes.number,
		squat: PropTypes.number,
		deadlift: PropTypes.number,
		overhead: PropTypes.number,
		chinup: PropTypes.object,
	}),
	dispatch: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func,
		goBack: PropTypes.func,
	}).isRequired,
};
LiftPage.defaultProps = {
	masterWeights: {
		bench: 0,
		row: 0,
		squat: 0,
		deadlift: 0,
		overhead: 0,
		chinup: {},
	},
	match: {
		params: {},
	},
};

const mapStateToProps = (state) => {
	return {
		masterWeights: state.masterWeights,
	};
};

export default withRouter(connect(mapStateToProps)(LiftPage));
