import { createStore, combineReducers } from 'redux';
import masterWeightsReducer from '../reducers/masterWeights';
import liftVariantReducer from '../reducers/liftVariant';
import inProgressWorkoutReducer from '../reducers/inProgressWorkout';
import workoutsReducer from '../reducers/workouts';

export default () => {
    const store = createStore(
        combineReducers({
            masterWeights: masterWeightsReducer,
            liftVariant: liftVariantReducer,
            inProgressWorkout: inProgressWorkoutReducer,
            workouts: workoutsReducer
        })
    );
    return store;
};
