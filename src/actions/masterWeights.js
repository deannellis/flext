import database from '../firebase/firebase';

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
	return (dispatch, getState) => {
		const { uid } = getState().auth;
		return database
			.ref(`users/${uid}/masterWeights`)
			.set(weightsData)
			.then(() => {
				dispatch(setMasterWeights(weightsData));
			});
	};
};

export const startFetchMasterWeights = () => {
	return (dispatch, getState) => {
		const { uid } = getState().auth;
		return database
			.ref(`users/${uid}/masterWeights`)
			.once('value')
			.then((snapshot) => {
				dispatch(setMasterWeights(snapshot.val()));
			});
	};
};

export const updateMasterWeights = ({
	bench,
	row,
	squat,
	deadlift,
	overhead,
	chinup,
}) => ({
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

export const startUpdateMasterWeights = ({
	bench = null,
	row = null,
	squat = null,
	deadlift = null,
	overhead = null,
	chinup = null,
} = {}) => {
	const updates = {
		bench,
		row,
		squat,
		deadlift,
		overhead,
		chinup,
	};
	return (dispatch, getState) => {
		const updatedMasterWeights = {};
		const currentWeights = getState().masterWeights;
		const keys = Object.keys(updates);
		const { uid } = getState().auth;
		keys.forEach((key) => {
			if (updates[key] !== null) {
				if (key !== 'chinup') {
					let increase = 2.5;
					if (key === 'squat' || key === 'deadlift') increase = 5;
					if (updates[key] === 0) {
						const deload = currentWeights[key] / 10;
						if (currentWeights[key] - deload > 44) {
							updatedMasterWeights[key] = Math.round(
								currentWeights[key] - deload
							);
						} else {
							updatedMasterWeights[key] = 44;
						}
					} else if (updates[key] === 1) {
						updatedMasterWeights[key] = Math.round(
							currentWeights[key] + increase
						);
					} else if (updates[key] === 2) {
						updatedMasterWeights[key] = Math.round(
							currentWeights[key] + increase * 2
						);
					}
				} else if (updates[key] === 1) {
					updatedMasterWeights[key] = { ...currentWeights[key] };
					const { negatives } = currentWeights[key];
					if (negatives > 0) {
						updatedMasterWeights.chinup.negatives =
							currentWeights.chinup.negatives - 1;
						updatedMasterWeights.chinup.ups = currentWeights.chinup.ups + 1;
					} else {
						updatedMasterWeights.chinup.weight =
							currentWeights.chinup.weight + 2.5;
					}
				}
			}
		});
		return database
			.ref(`users/${uid}/masterWeights`)
			.update(updatedMasterWeights)
			.then(() => {
				dispatch(updateMasterWeights(updates));
			});
	};
};

export const setWeight = (update) => {
	return {
		type: 'SET_WEIGHT',
		update,
	};
};

export const startSetWeight = ({ update = {} } = {}) => {
	return (dispatch, getState) => {
		const { uid } = getState().auth;
		return database
			.ref(`users/${uid}/masterWeights`)
			.update(update)
			.then(() => {
				dispatch(setWeight(update));
			});
	};
};
