const macrosReducerDefaultState = {
	target: {
		protein: null,
		carbs: null,
		fat: null
	},
	current: {
		protein: null,
		carbs: null,
		fat: null
	},
	dateObject: null
};

const macrosReducer = (state = macrosReducerDefaultState, action) => {
	let setTargetUpdates = {};
	const { update } = action;
	const updateMacroUpdates = { ...state };
	const { currentDate } = action;
	const setCurrentDateUpdates = { ...state };
	const resetCurrentUpdates = {
		target: { ...state.target },
		current: { ...macrosReducerDefaultState.current },
		dateObject: null
	};
	switch (action.type) {
		case 'SET_TARGET_MACROS':
			setTargetUpdates = {
				target: { ...action.target },
				current: { ...state.current },
				dateObject: { ...state.dateObject }
			};
			return setTargetUpdates;
		case 'UPDATE_MACRO':
			if (updateMacroUpdates.current[update.macro] !== null) {
				updateMacroUpdates.current[update.macro] += update.amount;
			} else {
				updateMacroUpdates.current[update.macro] = update.amount;
			}
			return updateMacroUpdates;
		case 'SET_CURRENT_DATE':
			setCurrentDateUpdates.dateObject = currentDate;
			return setCurrentDateUpdates;
		case 'RESET_CURRENT':
			return resetCurrentUpdates;
		default:
			return state;
	}
};

export default macrosReducer;
