const macrosReducerDefaultState = {
	target: {
		protein: null,
		carbs: null,
		fat: null,
	},
	current: {
		protein: null,
		carbs: null,
		fat: null,
	},
	dateObject: null,
};

const macrosReducer = (state = macrosReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_MACROS': {
			const { current, target } = action;
			return {
				current,
				target,
				dateObject: state.dateObject,
			};
		}
		case 'SET_TARGET_MACROS': {
			let setTargetUpdates = {};
			setTargetUpdates = {
				target: { ...action.target },
				current: { ...state.current },
				dateObject: { ...state.dateObject },
			};
			return setTargetUpdates;
		}
		case 'UPDATE_MACRO': {
			const { update } = action;
			const updateMacroUpdates = { ...state };
			if (updateMacroUpdates.current[update.macro] !== null) {
				updateMacroUpdates.current[update.macro] += update.amount;
			} else {
				updateMacroUpdates.current[update.macro] = update.amount;
			}
			return updateMacroUpdates;
		}
		case 'SET_CURRENT_DATE': {
			const { currentDate } = action;
			const setCurrentDateUpdates = { ...state };
			setCurrentDateUpdates.dateObject = currentDate;
			return setCurrentDateUpdates;
		}
		case 'RESET_CURRENT': {
			const resetCurrentUpdates = {
				target: { ...state.target },
				current: { ...macrosReducerDefaultState.current },
				dateObject: null,
			};
			return resetCurrentUpdates;
		}
		case 'SYNC_MACROS':
			return macrosReducerDefaultState;
		default:
			return state;
	}
};

export default macrosReducer;
