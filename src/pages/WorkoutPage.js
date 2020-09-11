import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Trail } from 'react-spring/renderprops';

import { getWorkouts, getDisplayName, getEmoji } from '../utils/workout';
import Button from '../components/Button';
import { startAddWorkout } from '../actions/workouts';
import { resetWorkout, startWorkout } from '../actions/inProgressWorkout';
import { startUpdateMasterWeights } from '../actions/masterWeights';
import { startUpdateLiftVariant } from '../actions/liftVariant';
import { LeftArrowIcon } from '../utils/icons';
import MenuContext from '../context/menu-context';

export class WorkoutPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			complete: false,
			created: moment(),
		};
	}

	componentDidMount() {
		let complete = true;
		const { inProgressWorkout, onStartWorkout } = this.props;
		const { setPageMenu } = this.context;
		const workoutKeys = Object.keys(inProgressWorkout);
		if (workoutKeys.length === 0) {
			complete = false;
			onStartWorkout();
		}
		workoutKeys.forEach((lift) => {
			if (inProgressWorkout[lift] === null) complete = false;
		});
		if (complete) {
			this.setState({ complete });
		}
		setPageMenu(false);
	}

	componentWillUnmount() {
		const { setPageMenu } = this.context;
		setPageMenu(true);
	}

	onStartLift = (lift) => {
		const { history } = this.props;
		history.push(`/workout/${lift}`);
	};

	completeWorkout = () => {
		const {
			inProgressWorkout,
			masterWeights,
			history,
			onStartAddWorkout,
			onUpdateMasterWeights,
			onUpdateLiftVariant,
			onResetWorkout,
		} = this.props;
		const { created } = this.state;
		const workoutPayload = {
			workout: inProgressWorkout,
			currentWeight: masterWeights,
			created: created.valueOf(),
		};
		onStartAddWorkout(workoutPayload);
		onUpdateMasterWeights(inProgressWorkout);
		onUpdateLiftVariant();
		onResetWorkout();
		history.push(`/home`);
	};

	render() {
		const {
			masterWeights,
			workouts,
			liftVariant,
			inProgressWorkout,
			history,
		} = this.props;
		const { complete } = this.state;
		const { negatives, ups, weight } = masterWeights.chinup;
		const emojis = [getEmoji(), getEmoji(), getEmoji()];
		return (
			<div className="workout-page__wrapper">
				<div className="workout-page">
					<h1>{`Workout #${workouts.length + 1}`}</h1>
					{complete && (
						<div className="workout-page__lift card">
							<h2>Hell Yeah!</h2>
							<Button variant="primary" clickHandler={this.completeWorkout}>
								Finish Workout
							</Button>
						</div>
					)}
					<Trail
						items={getWorkouts(liftVariant)}
						keys={(lift) => lift}
						from={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
						to={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
					>
						{(lift) => (props) => (
							<div className="workout-page__lift card" style={props}>
								<h2>{getDisplayName(lift)}</h2>
								<p>
									{lift !== 'chinup'
										? `3 sets of 5 reps @${masterWeights[lift]}lbs`
										: `
                                        ${
																					negatives === 0
																						? ''
																						: `${negatives} negatives`
																				}
                                        ${
																					negatives !== 0 && ups !== 0
																						? ', '
																						: ''
																				}
                                        ${ups === 0 ? '' : `${ups} chin-ups`}
                                        ${weight === 0 ? '' : `${weight} lbs`}

                                    `}
								</p>
								{inProgressWorkout[lift] !== null ? (
									<p>
										Completed:
										{inProgressWorkout[lift] === 0 && lift !== 'chinup'
											? ' Last set less than 5 reps'
											: ''}
										{inProgressWorkout[lift] === 1 && lift !== 'chinup'
											? ' Last set greater than 5 reps '
											: ''}
										{inProgressWorkout[lift] === 1 && lift !== 'chinup' && (
											<span>{emojis[0]}</span>
										)}
										{inProgressWorkout[lift] === 2 && lift !== 'chinup'
											? ' Last set greater than 10 reps '
											: ''}
										{inProgressWorkout[lift] === 2 && lift !== 'chinup' && (
											<span>{emojis[1]}</span>
										)}
										{inProgressWorkout[lift] === 0 && lift === 'chinup'
											? ' Better luck next time'
											: ''}
										{inProgressWorkout[lift] === 1 && lift === 'chinup'
											? ' All reps completed! '
											: ''}
										{inProgressWorkout[lift] === 1 && lift === 'chinup' && (
											<span>{emojis[2]}</span>
										)}
									</p>
								) : (
									<Button
										variant="primary"
										clickHandler={() => {
											this.onStartLift(lift);
										}}
									>
										begin lift
									</Button>
								)}
							</div>
						)}
					</Trail>
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
		);
	}
}
WorkoutPage.contextType = MenuContext;
WorkoutPage.propTypes = {
	masterWeights: PropTypes.shape({
		bench: PropTypes.number,
		row: PropTypes.number,
		squat: PropTypes.number,
		deadlift: PropTypes.number,
		overhead: PropTypes.number,
		chinup: PropTypes.object,
	}),
	liftVariant: PropTypes.shape({
		a: PropTypes.number,
		b: PropTypes.number,
	}),
	workouts: PropTypes.arrayOf(PropTypes.object),
	inProgressWorkout: PropTypes.objectOf(PropTypes.number),
	history: PropTypes.shape({
		push: PropTypes.func,
		goBack: PropTypes.func,
	}).isRequired,
	onStartWorkout: PropTypes.func.isRequired,
	onStartAddWorkout: PropTypes.func.isRequired,
	onUpdateMasterWeights: PropTypes.func.isRequired,
	onUpdateLiftVariant: PropTypes.func.isRequired,
	onResetWorkout: PropTypes.func.isRequired,
};
WorkoutPage.defaultProps = {
	masterWeights: {
		bench: 0,
		row: 0,
		squat: 0,
		deadlift: 0,
		overhead: 0,
		chinup: {
			negatives: 0,
			ups: 0,
			weight: 0,
		},
	},
	liftVariant: { a: 0, b: 0 },
	workouts: [],
	inProgressWorkout: {
		bench: null,
		row: null,
		squat: null,
	},
};

const mapStateToProps = (state) => {
	return {
		masterWeights: state.masterWeights,
		liftVariant: state.liftVariant,
		workouts: state.workouts,
		inProgressWorkout: state.inProgressWorkout,
	};
};
const mapDispatchToProps = (dispatch) => ({
	onStartWorkout: () => {
		dispatch(startWorkout());
	},
	onStartAddWorkout: (workout) => {
		dispatch(startAddWorkout(workout));
	},
	onUpdateMasterWeights: (inProgressWorkout) => {
		dispatch(startUpdateMasterWeights(inProgressWorkout));
	},
	onUpdateLiftVariant: () => {
		dispatch(startUpdateLiftVariant());
	},
	onResetWorkout: () => {
		dispatch(resetWorkout());
	},
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(WorkoutPage)
);
