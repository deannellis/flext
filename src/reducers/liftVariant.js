export const liftVariantReducerDefaultState = { a: 0, b: 0 };
const liftVariantReducer = (state = liftVariantReducerDefaultState, action) => {
	const updatedState = {
		a: 0,
		b: 0,
	};
	switch (action.type) {
		case 'UPDATE_LIFT_VARIANT':
			if (state.a === 0) {
				updatedState.a = 1;
			}
			if (state.b === 2) {
				updatedState.b = 0;
			} else {
				updatedState.b = state.b + 1;
			}
			return updatedState;
		case 'SYNC_LIFT_VARIANT':
			return liftVariantReducerDefaultState;
		case 'SET_LIFT_VARIANT':
			return action.variant;
		default:
			return state;
	}
};

export default liftVariantReducer;
