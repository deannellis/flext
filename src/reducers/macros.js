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
            let updatedState = {};
            updatedState = {
                target: { ...action.target },
                current: { ...state.current }
            }
            return updatedState;
        default:
            return state;
    }
}

export default macrosReducer;