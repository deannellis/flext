import uuid from 'uuid';
import database from '../firebase/firebase';

export const addWorkout = (workout) => ({
	type: 'ADD_WORKOUT',
	workout,
});

export const startAddWorkout = (workoutData = {}) => {
	return (dispatch) => {
		const { workout = {}, currentWeight = {}, created = 0 } = workoutData;
		const workoutObject = { workout, currentWeight, created };

		database
			.ref('workouts')
			.push(workoutObject)
			.then((ref) => {
				dispatch(
					addWorkout({
						id: ref.key,
						...workoutObject,
					})
				);
			});
	};
};
