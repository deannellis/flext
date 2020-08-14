import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import filtersReducer from '../reducers/filters';
import macrosReducer from '../reducers/macros';
import masterWeightsReducer from '../reducers/masterWeights';
import liftVariantReducer from '../reducers/liftVariant';
import inProgressWorkoutReducer from '../reducers/inProgressWorkout';
import workoutsReducer from '../reducers/workouts';
import { saveState, loadState } from './localStorage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			filters: filtersReducer,
			masterWeights: masterWeightsReducer,
			liftVariant: liftVariantReducer,
			inProgressWorkout: inProgressWorkoutReducer,
			workouts: workoutsReducer,
			macros: macrosReducer,
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};
