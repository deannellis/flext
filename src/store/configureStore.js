import { createStore, combineReducers } from 'redux';
import filtersReducer from '../reducers/filters';
import macrosReducer from '../reducers/macros';
import masterWeightsReducer from '../reducers/masterWeights';
import liftVariantReducer from '../reducers/liftVariant';
import inProgressWorkoutReducer from '../reducers/inProgressWorkout';
import workoutsReducer from '../reducers/workouts';
import { saveState, loadState } from './localStorage';

export default () => {
	const persistedState = loadState();
	const store = createStore(
		combineReducers({
			filters: filtersReducer,
			masterWeights: masterWeightsReducer,
			liftVariant: liftVariantReducer,
			inProgressWorkout: inProgressWorkoutReducer,
			workouts: workoutsReducer,
			macros: macrosReducer
		}),
		persistedState,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

	store.subscribe(() => {
		saveState(store.getState());
	});

	return store;
};
