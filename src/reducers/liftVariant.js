const liftVariantReducerDefaultState = { a: 0, b: 0 };
const liftVariantReducer = (state = liftVariantReducerDefaultState, action) => {
    switch(action.type) {
        case 'UPDATE_LIFT_VARIANT':
            let updatedState = {
                a: 0,
                b: 0
            };
            if(state.a == 0) {
                updatedState.a = 1;
            }
            if(state.b == 2) {
                updatedState.b = 0;
            } else {
                updatedState.b = state.b + 1;
            }
            return updatedState;
        default:
            return state;
    }
}

export default liftVariantReducer;