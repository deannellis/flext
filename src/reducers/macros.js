import { setCurrentDate } from "../actions/macros";

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
    switch(action.type) {
        case 'SET_TARGET_MACROS':
            let setTargetUpdates = {};
            setTargetUpdates = {
                target: { ...action.target },
                current: { ...state.current },
                dateObject: { ...state.dateObject },
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
            setCurrentDateUpdates.dateObject = currentDate;
            return setCurrentDateUpdates;
        case 'RESET_CURRENT':
            let resetCurrentUpdates = {
                target: { ...state.target },
                current: { ...macrosReducerDefaultState.current },
                dateObject: null
            };
            return resetCurrentUpdates;
        default:
            return state;
    }
}

export default macrosReducer;