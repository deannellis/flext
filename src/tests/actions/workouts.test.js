import configureMockstore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
	addWorkout,
	startAddWorkout,
	setWorkouts,
	startFetchWorkouts,
} from '../../actions/workouts';
import {
	workoutData,
	testId,
	workouts,
	weights,
	workoutsLean,
	workoutsFirebaseFormat,
} from '../fixtures/workout';
import database from '../../firebase/firebase';

const createMockStore = configureMockstore([thunk]);

beforeEach((done) => {
	const workoutsData = {};
	workouts.forEach((workout, i) => {
		const { id, created } = workout;
		workoutsData[id] = {
			created,
			currentWeight: weights,
			workout: workoutsLean[i],
		};
	});
	database
		.ref('workouts')
		.set(workoutsData)
		.then(() => {
			sentWorkouts = workoutsData;
			done();
		});
});

test('should return Add Workout action object', () => {
	const action = addWorkout({ ...workoutData, id: testId });
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

test('should setup set workouts action with data', () => {
	const action = setWorkouts(workouts);
	expect(action).toEqual({
		type: 'SET_WORKOUTS',
		workouts,
	});
});

test('should fetch expenses from firebase', (done) => {
	const store = createMockStore({});
	store.dispatch(startFetchWorkouts()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_WORKOUTS',
			workouts: workoutsFirebaseFormat,
		});
		done();
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
