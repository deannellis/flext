import { batchActions } from 'redux-batched-actions';

import { startFetchWorkouts } from './workouts';
import { startFetchMasterWeights } from './masterWeights';

export default () => {
	return (dispatch) => {
		return dispatch(
			batchActions([startFetchWorkouts(), startFetchMasterWeights()])
		);
	};
};
