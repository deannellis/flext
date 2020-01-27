const macrosReducerDefaultState = {
    target: {
        protein: null,
        carbs: null,
        fat: null,
    },
    current: {
        date: null,
        protein: null,
        carbs: null,
        fat: null,
    }
};

const macrosReducer = (state = macrosReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TARGET_MACROS':
            let setTargetUpdates = {};
            setTargetUpdates = {
                target: { ...action.target },
                current: { ...state.current }
            }
            return setTargetUpdates;
        case 'UPDATE_MACRO':
            const { update } = action;
            let updateMacroUpdates = { ...state };
            if(updateMacroUpdates.current[update.macro] !== null) {
                updateMacroUpdates.current[update.macro] = updateMacroUpdates.current[update.macro] + update.amount;
            } else {
                updateMacroUpdates.current[update.macro] = update.amount;
            }
            return updateMacroUpdates;
        case 'SET_CURRENT_DATE':
            const { currentDate } = action;
            let setCurrentDateUpdates = { ...state };
            setCurrentDateUpdates.current.date = currentDate;
            return setCurrentDateUpdates;
        case 'RESET_CURRENT':
            let resetCurrentUpdates = {
                target: { ...action.target },
                current: { ...macrosReducerDefaultState.current }
            };
            return resetCurrentUpdates;
        default:
            return state;
    }
}

export default macrosReducer;