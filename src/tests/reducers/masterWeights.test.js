import masterWeightsReducer from '../../reducers/masterWeights';
import { weights } from '../fixtures/workout';

test('should set default state', () => {
	const state = masterWeightsReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual({});
});

test('should set master weights', () => {
	const action = {
		type: 'SET_MASTER_WEIGHTS',
		weights,
	};
	const state = masterWeightsReducer({}, action);

	expect(state).toEqual(weights);
});

test('should update master weights given lift updates', () => {
	const updates = {
		bench: 0,
		row: 1,
		deadlift: 2,
	};
	const action = {
		type: 'UPDATE_MASTER_WEIGHTS',
		updates,
	};
	const state = masterWeightsReducer(weights, action);

	expect(state).toEqual({
		bench: 77,
		row: 118,
		squat: 156,
		deadlift: 116,
		overhead: 112,
		chinup: { ups: 3, negatives: 2, weight: 0 },
	});
});

test('should update master weights given chinup success updates', () => {
	const action = {
		type: 'UPDATE_MASTER_WEIGHTS',
		updates: {
			squat: 2,
			overhead: 2,
			chinup: 1,
		},
	};
	const successState = masterWeightsReducer(weights, action);
	const upsAtFiveState = masterWeightsReducer(
		{
			bench: 85,
			row: 115,
			squat: 156,
			deadlift: 106,
			overhead: 112,
			chinup: { ups: 5, negatives: 0, weight: 0 },
		},
		action
	);

	expect(successState).toEqual({
		bench: 85,
		row: 115,
		squat: 166,
		deadlift: 106,
		overhead: 117,
		chinup: { ups: 4, negatives: 1, weight: 0 },
	});
	expect(upsAtFiveState).toEqual({
		bench: 85,
		row: 115,
		squat: 166,
		deadlift: 106,
		overhead: 117,
		chinup: { ups: 5, negatives: 0, weight: 2.5 },
	});
});

test('should update master weights given chinup fail updates', () => {
	const action = {
		type: 'UPDATE_MASTER_WEIGHTS',
		updates: {
			squat: 2,
			overhead: 2,
			chinup: 0,
		},
	};
	const prevState = {
		bench: 85,
		row: 115,
		squat: 156,
		deadlift: 106,
		overhead: 112,
		chinup: { ups: 3, negatives: 2, weight: 0 },
	};
	const failState = masterWeightsReducer(prevState, action);

	expect(failState).toEqual({
		bench: 85,
		row: 115,
		squat: 166,
		deadlift: 106,
		overhead: 117,
		chinup: { ups: 3, negatives: 2, weight: 0 },
	});
});
