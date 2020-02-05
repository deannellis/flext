import workoutsReducer from '../../reducers/workouts';
import { workoutData, storedWorkout } from '../fixtures/workout';

test('should set default state', () => {
    const state = workoutsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should add a workout', () => {
    const { workout, currentWeight, created } = workoutData;
    const action = {
        type: 'ADD_WORKOUT',
        workout,
        currentWeight,
        created,
        id: 'abc123'
    };
    storedWorkout.id = action.id;
    const state = workoutsReducer([], action);
    expect(state).toEqual([storedWorkout]);
});
