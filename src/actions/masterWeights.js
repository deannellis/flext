import database from '../firebase/firebase';
import { dispatch } from 'd3';

export const setMasterWeights = (weights) => ({
	type: 'SET_MASTER_WEIGHTS',
	weights,
});

export const startSetMasterWeights = ({
	bench = 0,
	row = 0,
	squat = 0,
	deadlift = 0,
	overhead = 0,
	chinup = {
		ups: 0,
		negatives: 5,
		weight: 0,
	},
} = {}) => {
	const weightsData = {
		bench,
		row,
		squat,
		deadlift,
		overhead,
		chinup,
	};
	return (dispatch) => {
		return database
			.ref('masterWeights')
			.set(weightsData)
			.then(() => {
				dispatch(setMasterWeights(weightsData));
			});
	};
};

export const startFetchMasterWeights = () => {
	return (dispatch) => {
		return database
			.ref('masterWeights')
			.once('value')
			.then((snapshot) => {
				console.log('from fb ', snapshot.val());
				dispatch(setMasterWeights(snapshot.val()));
			});
	};
};

export const updateMasterWeights = ({
	bench = null,
	row = null,
	squat = null,
	deadlift = null,
	overhead = null,
	chinup = null,
} = {}) => ({
	type: 'UPDATE_MASTER_WEIGHTS',
	updates: {
		bench,
		row,
		squat,
		deadlift,
		overhead,
		chinup,
	},
});

export const setWeight = ({ update = {} } = {}) => {
	return {
		type: 'SET_WEIGHT',
		update,
	};
};
