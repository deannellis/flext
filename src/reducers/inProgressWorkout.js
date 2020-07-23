const inProgressWorkoutReducer = (state = {}, action) => {
	const { a, b, updates } = action;
	let startingState = {};
	const updatedState = { ...state };
	const keys = Object.keys(updates);

	switch (action.type) {
		case 'START_WORKOUT':
			if (a === 0) {
				startingState = {
					...startingState,
					overhead: null,
					chinup: null,
				};
			} else {
				startingState = {
					...startingState,
					bench: null,
					row: null,
				};
			}
			if (b === 0 || b === 2) {
				startingState = {
					...startingState,
					squat: null,
				};
			} else {
				startingState = {
					...startingState,
					deadlift: null,
				};
			}
			return startingState;
		case 'UPDATE_WORKOUT':
			keys.forEach((key) => {
				if (Object.prototype.hasOwnProperty.call(updatedState, key)) {
					updatedState[key] = updates[key];
				}
			});
			return updatedState;
		case 'RESET_WORKOUT':
			return {};
		default:
			return state;
	}
};

export default inProgressWorkoutReducer;
