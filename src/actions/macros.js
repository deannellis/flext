import database from '../firebase/firebase';

export const setMacros = (current = {}, target = {}) => ({
	type: 'SET_MACROS',
	target,
	current,
});

export const startFetchMacros = () => {
	return (dispatch, getState) => {
		const { uid } = getState().auth;
		return database
			.ref(`users/${uid}/macros`)
			.once('value')
			.then((snapshot) => {
				if (snapshot.val() !== null) {
					const { target, current } = snapshot.val();
					dispatch(setMacros(current, target));
				}
			});
	};
};

export const setTargetMacros = ({ protein, carbs, fat }) => ({
	type: 'SET_TARGET_MACROS',
	target: {
		protein,
		carbs,
		fat,
	},
});

export const startSetTargetMacros = ({
	protein = 0,
	carbs = 0,
	fat = 0,
} = {}) => {
	return (dispatch, getState) => {
		const { uid } = getState().auth;
		return database
			.ref(`users/${uid}/macros`)
			.set({
				target: { protein, carbs, fat },
				current: { protein: 0, carbs: 0, fat: 0 },
			})
			.then(() => {
				dispatch(setTargetMacros({ protein, carbs, fat }));
			});
	};
};

export const updateMacro = ({ macro, amount }) => ({
	type: 'UPDATE_MACRO',
	update: {
		macro,
		amount,
	},
});

export const startUpdateMacro = ({ macro = '', amount = 0 } = {}) => {
	return (dispatch, getState) => {
		const { uid } = getState().auth;
		const { current } = getState().macros;
		const newAmount = current[macro] + amount;
		return database
			.ref(`users/${uid}/macros/current/${macro}`)
			.set(newAmount)
			.then(() => {
				dispatch(updateMacro({ macro, amount }));
			});
	};
};

export const setCurrentDate = ({ currentDate = 0 } = {}) => ({
	type: 'SET_CURRENT_DATE',
	currentDate,
});

export const resetCurrent = () => ({ type: 'RESET_CURRENT' });

export const startResetCurrent = () => {
	return (dispatch, getState) => {
		const { uid } = getState().auth;
		return database
			.ref(`users/${uid}/macros/current`)
			.set({ protein: 0, carbs: 0, fat: 0 })
			.then(() => {
				dispatch(resetCurrent());
			});
	};
};
