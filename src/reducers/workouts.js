const workoutsReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_WORKOUT': {
			const { workout, created, currentWeight, id } = action;
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
				id,
			};
			return [...state, newWorkout];
		}

		case 'SET_WORKOUTS':
			return action.workouts;
		default:
			return state;
	}
};

export default workoutsReducer;
