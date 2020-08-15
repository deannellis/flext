import configureMockstore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { addWorkout, startAddWorkout } from '../../actions/workouts';
import { workoutData, id } from '../fixtures/workout';
import database from '../../firebase/firebase';

const createMockStore = configureMockstore([thunk]);

test('should return Add Workout action object', () => {
	const action = addWorkout({ ...workoutData, id });
	expect(action).toEqual({
		type: 'ADD_WORKOUT',
		...workoutData,
		id: expect.any(String),
	});
});

test('should add workout to database and store', (done) => {
	const store = createMockStore({});

	store.dispatch(startAddWorkout(workoutData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_WORKOUT',
			...workoutData,
			id: expect.any(String),
		});

		database
			.ref(`workouts/${actions[0].id}`)
			.once('value')
			.then((snapshot) => {
				expect(snapshot.val()).toEqual({ ...workoutData });
				done();
			});
	});
});

test('should add workout with defaults to database and store', (done) => {
	const store = createMockStore({});

	store.dispatch(startAddWorkout({})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_WORKOUT',
			workout: {},
			currentWeight: {},
			created: 0,
			id: expect.any(String),
		});

		database
			.ref(`workouts/${actions[0].id}`)
			.once('value')
			.then((snapshot) => {
				expect(snapshot.val()).toEqual({
					created: 0,
				});
				done();
			});
	});
});

// test('should return Add Workout action object with defaults', () => {
// 	const action = addWorkout();
// 	expect(action).toEqual({
// 		type: 'ADD_WORKOUT',
// 		workout: {},
// 		currentWeight: {},
// 		created: 0,
// 		id: expect.any(String),
// 	});
// });
