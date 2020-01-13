import { createStore, combineReducers } from 'redux';
import masterWeightsReducer from '../reducers/masterWeights';
import liftVariantReducer from '../reducers/liftVariant';
import inProgressWorkoutReducer from '../reducers/inProgressWorkout';
import workoutsReducer from '../reducers/workouts';
import { saveState, loadState } from './localStorage';

export default () => {
    const persistedState = loadState();
    const store = createStore(
        combineReducers({
            masterWeights: masterWeightsReducer,
            liftVariant: liftVariantReducer,
            inProgressWorkout: inProgressWorkoutReducer,
            workouts: workoutsReducer
        }),
        persistedState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    store.subscribe(() => {
        saveState(store.getState());
    });

    return store;
};
