import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// MASTER WEIGHTS
const setMasterWeights = ({
    bench = 0,
    row = 0,
    squat = 0,
    deadlift = 0,
    overhead = 0,
    chinup = {
        ups: 0,
        negatives: 5,
        weight: 0
    }
} = {}) => ({
    type: 'SET_MASTER_WEIGHTS',
    weights: {
        bench,
        row,
        squat,
        deadlift,
        overhead,
        chinup
    }
});

const updateMasterWeights = ({
    bench = null,
    row = null,
    squat = null,
    deadlift = null,
    overhead = null,
    chinup = null
} = {}) => ({
    type: 'UPDATE_MASTER_WEIGHTS',
    updates: {
        bench,
        row,
        squat,
        deadlift,
        overhead,
        chinup
    }
});

const masterWeightsReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_MASTER_WEIGHTS':
            return action.weights;
        case 'UPDATE_MASTER_WEIGHTS':
            let updatedMasterWeights = { ...state };
            const { updates } = action;
    
            // console.log('1', updatedMasterWeights);
            for(let key in updates) {
                if(updates[key] !== null) {
                    if(key !== 'chinup') {
                        let increase = 2.5;
                        if(key == 'squat' || key == 'deadlift') increase = 5;
                        if(updates[key] == 0) {
                            const deload = state[key] / 10;
                            if(state[key] - deload > 44) {
                                updatedMasterWeights[key] = state[key] - deload;
                            } else { updatedMasterWeights[key] = 44}
                        }
                        else if(updates[key] == 1) {
                            updatedMasterWeights[key] = state[key] + increase;
                        }
                        else if(updates[key] == 2) {
                            updatedMasterWeights[key] = state[key] + (increase * 2);
                        }
                    } else {
                        if(updates[key] == 1) {
                            const { ups, negatives, weight } = state[key];
                            if(negatives > 0) {
                                console.log('db1');
                                updatedMasterWeights.chinup.negatives = state.chinup.negatives - 1;
                                updatedMasterWeights.chinup.ups = state.chinup.ups + 1;
                            } else {
                                console.log('db1');
                                updatedMasterWeights.chinup.weight = state.chinup.weight + 2.5;
                            }
                        }
                    }
                }
            }
            return updatedMasterWeights;
        default:
            return state;
    }
}

// LIFT VARIANT
const updateLiftVariant = () => ({ type: 'UPDATE_LIFT_VARIANT' });

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

// INPROGRESS WORKOUT
const startWorkout = ({
    a = 0,
    b = 0
} = {}) => ({
    type: 'START_WORKOUT',
    a,
    b
});
const updateWorkout = ({
    updates = {}
}) => ({
    type: 'UPDATE_WORKOUT',
    updates
});
const resetWorkout = () => ({ type: 'RESET_WORKOUT' });

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
                if(updates.hasOwnProperty(key)) {
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

// WORKOUTS
const addWorkout = ({
    workout = {},
    currentWeight = {},
    created = 0
} = {}) => ({
    type: 'ADD_WORKOUT',
    id: uuid(),
    workout,
    currentWeight,
    created
});
const workoutsReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_WORKOUT':
            console.log('da action', action);
            const { workout, created, currentWeight, id } = action;
            let newWorkout = {};
            for(let key in workout) {
                newWorkout = {
                    ...newWorkout,
                    [key]: {
                        weight: currentWeight[key],
                        result: workout[key]
                    }
                }
            }
            newWorkout = {
                ...newWorkout,
                created,
                id
            }
            return [ ...state, newWorkout ];
        default:
            return state;
    }
}

// STORE
const store = createStore(
    combineReducers({
        masterWeights: masterWeightsReducer,
        liftVariant: liftVariantReducer,
        inProgressWorkout: inProgressWorkoutReducer,
        workouts: workoutsReducer
    })
);
// console.log(store.getState());

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(setMasterWeights({ bench: 50 }));
// store.dispatch(updateLiftVariant());
store.dispatch(startWorkout({ a: 0, b: 2}));
store.dispatch(updateWorkout({updates: { squat: 1 }}));
store.dispatch(addWorkout({
    workout: {overhead: 2, chinup: 0, squat: 1},
    currentWeight: {
        bench: 50,
        row: 0,
        squat: 0,
        deadlift: 0,
        overhead: 0,
        chinup: {
            ups: 0,
            negatives: 5,
            weight: 0
        }
    }
}));

// Note: weights exclude the bar
const demoState = {
    masterWeights: {
        bench: 65,
        row: 80,
        squat: 130,
        deadlift: 180,
        overhead: 50,
        chinup: {
            ups: 2,
            negatives: 3,
            weight: 0
        }
    },

    liftVariant: {
        a: 0,
        b: 0,
    },

    inProgressWorkout: {
        overhead: 2,
        row: 1,
        squat: 0
    },

    workouts: [
        {
            id: 'asdasfsaf',
            created: 0,
            overhead: {
                weight: 50,
                result: 0
            },
            row: {
                weight: 80,
                result: 1
            },
            squat: {
                weight: 130,
                result: 2
            }
        }
    ]
}