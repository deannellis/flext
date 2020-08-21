import database from '../firebase/firebase';

export const addWorkout = (workout) => ({
	type: 'ADD_WORKOUT',
	...workout,
});

export const startAddWorkout = (workoutData = {}) => {
	return (dispatch, getState) => {
		const { uid } = getState().auth;
		const { workout = {}, currentWeight = {}, created = 0 } = workoutData;
		const workoutObject = { workout, currentWeight, created };
		return database
			.ref(`users/${uid}/workouts`)
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
	return (dispatch, getState) => {
		const { uid } = getState().auth;
		return database
			.ref(`users/${uid}/workouts`)
			.once('value')
			.then((snapshot) => {
				const workouts = [];
				snapshot.forEach((child) => {
					const { currentWeight, workout, created } = child.val();
					const keys = Object.keys(workout);
					let newWorkout = {};
					keys.forEach((key) => {
						newWorkout = {
							...newWorkout,
							[key]: {
								weight: currentWeight[key],
								result: workout[key],
							},
						};
					});
					newWorkout = {
						...newWorkout,
						created,
						id: child.key,
					};
					workouts.push(newWorkout);
				});

				dispatch(setWorkouts(workouts));
			});
	};
};
