import database from '../firebase/firebase';

export const addWorkout = (workout) => ({
	type: 'ADD_WORKOUT',
	...workout,
});

export const startAddWorkout = (workoutData = {}) => {
	return (dispatch) => {
		const { workout = {}, currentWeight = {}, created = 0 } = workoutData;
		const workoutObject = { workout, currentWeight, created };
		return database
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

export const setWorkouts = (workouts) => ({
	type: 'SET_WORKOUTS',
	workouts,
});

export const startFetchWorkouts = () => {
	return (dispatch) => {
		return database
			.ref('workouts')
			.once('value')
			.then((snapshot) => {
				const workouts = [];
				snapshot.forEach((child) => {
					workouts.push({
						id: child.key,
						...child.val(),
					});
				});

				dispatch(setWorkouts(workouts));
			});
	};
};
