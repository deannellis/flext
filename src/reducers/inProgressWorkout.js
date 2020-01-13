const inProgressWorkoutReducer = (state = {}, action) => {
    switch(action.type) {
        case 'START_WORKOUT':
            const { a, b } = action;
            let startingState = {};
            if(a == 0) {
                startingState = {
                    ...startingState,
                    overhead: null,
                    chinup: null
                }
            } else {
                startingState = {
                    ...startingState,
                    bench: null,
                    row: null
                }
            }
            if(b == 0 || b == 2) {
                startingState = {
                    ...startingState,
                    squat: null
                }
            } else {
                startingState = {
                    ...startingState,
                    deadlift: null
                }
            }
            return startingState;
        case 'UPDATE_WORKOUT':
            const { updates } = action;
            let updatedState = { ...state };
            for(let key in updates) {
                if(updatedState.hasOwnProperty(key)) {
                    updatedState[key] = updates[key];
                }
            }
            return updatedState;
        case 'RESET_WORKOUT':
            return {};
        default:
            return state;
    }
}

export default inProgressWorkoutReducer;