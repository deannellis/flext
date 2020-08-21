import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';

import filtersReducer from '../reducers/filters';
import macrosReducer from '../reducers/macros';
import masterWeightsReducer from '../reducers/masterWeights';
import liftVariantReducer from '../reducers/liftVariant';
import inProgressWorkoutReducer from '../reducers/inProgressWorkout';
import workoutsReducer from '../reducers/workouts';
import authReducer from '../reducers/auth';
// import { saveState, loadState } from './localStorage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	// const persistedState = loadState();
	const store = createStore(
		enableBatching(
			combineReducers({
				filters: filtersReducer,
				masterWeights: masterWeightsReducer,
				liftVariant: liftVariantReducer,
				inProgressWorkout: inProgressWorkoutReducer,
				workouts: workoutsReducer,
				macros: macrosReducer,
				auth: authReducer,
			})
		),
		// persistedState,
		composeEnhancers(applyMiddleware(thunk))
	);
	// store.subscribe(() => {
	// 	saveState(store.getState());
	// });
	return store;
};
