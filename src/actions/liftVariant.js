import database from '../firebase/firebase';

import { liftVariantReducerDefaultState } from '../reducers/liftVariant';

export const updateLiftVariant = () => ({ type: 'UPDATE_LIFT_VARIANT' });

export const startUpdateLiftVariant = () => {
	return (dispatch, getState) => {
		const { uid } = getState().auth;
		const current = getState().liftVariant;
		const updatedVariant = {
			a: 0,
			b: 0,
		};
		if (current.a === 0) {
			updatedVariant.a = 1;
		}
		if (current.b === 2) {
			updatedVariant.b = 0;
		} else {
			updatedVariant.b = current.b + 1;
		}
		return database
			.ref(`users/${uid}/liftVariant`)
			.update(updatedVariant)
			.then(() => {
				dispatch(updateLiftVariant());
			});
	};
};

export const syncLiftVariant = () => ({
	type: 'SYNC_LIFT_VARIANT',
});

export const startSyncLiftVariant = () => {
	return (dispatch, getState) => {
		const { uid } = getState().auth;
		return database
			.ref(`users/${uid}/liftVariant`)
			.set(liftVariantReducerDefaultState)
			.then(() => {
				dispatch(syncLiftVariant());
			});
	};
};

export const setLiftVariant = (variant) => ({
	type: 'SET_LIFT_VARIANT',
	variant,
});

export const startFetchLiftVariant = () => {
	return (dispatch, getState) => {
		const { uid } = getState().auth;
		return database
			.ref(`users/${uid}/liftVariant`)
			.once('value')
			.then((snapshot) => {
				dispatch(setLiftVariant(snapshot.val()));
			});
	};
};
