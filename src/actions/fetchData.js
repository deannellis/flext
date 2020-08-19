import { startFetchWorkouts } from './workouts';
import { startFetchMasterWeights } from './masterWeights';

export default () => {
	return (dispatch) => {
		Promise.resolve(dispatch(startFetchWorkouts())).then(() =>
			dispatch(startFetchMasterWeights())
		);
	};
};
