import React from 'react';
import PropTypes from 'prop-types';

import { getWorkouts, getDisplayName } from '../utils/workout';
import Button from './Button';

const NextWorkout = ({ liftVariant, masterWeights, onStartWorkout }) => {
	return (
		<div className="next-workout card">
			<h2>Next Workout</h2>
			<div className="next-workout__lifts">
				{getWorkouts(liftVariant).map((workout) => {
					return (
						<p key={workout} className="next-workout__lift">
							{getDisplayName(workout)}
							<span className="next-workout__weight">
								{workout !== 'chinup' ? ` @${masterWeights[workout]}lbs` : ''}
							</span>
						</p>
					);
				})}
			</div>
			<Button
				variant="primary"
				className="next-workout__button"
				clickHandler={() => {
					onStartWorkout();
				}}
			>
				start workout
			</Button>
		</div>
	);
};
NextWorkout.propTypes = {
	liftVariant: { a: PropTypes.number, b: PropTypes.number },
	masterWeights: {
		bench: PropTypes.number,
		row: PropTypes.number,
		squat: PropTypes.number,
		deadlift: PropTypes.number,
		overhead: PropTypes.number,
		chinup: PropTypes.object,
	},
	onStartWorkout: PropTypes.func.isRequired,
};
NextWorkout.defaultProps = {
	liftVariant: { a: 0, b: 0 },
	masterWeights: {
		bench: 0,
		row: 0,
		squat: 0,
		deadlift: 0,
		overhead: 0,
		chinup: {},
	},
};

export default NextWorkout;
