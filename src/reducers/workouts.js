const workoutsReducer = (state = [], action) => {
	const { workout, created, currentWeight, id } = action;
	let newWorkout = {};
	const keys = Object.keys(workout);
	switch (action.type) {
		case 'ADD_WORKOUT':
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
		default:
			return state;
	}
};

export default workoutsReducer;
