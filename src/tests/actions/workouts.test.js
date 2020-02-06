import { addWorkout } from '../../actions/workouts';
import { workoutData } from '../fixtures/workout';

test('should return Add Workout action object', () => {
    const { workout, currentWeight, created } = workoutData;

    const action = addWorkout(workoutData);
    expect(action).toEqual({
        type: 'ADD_WORKOUT',
        workout,
        currentWeight,
        created,
        id: expect.any(String)
    });
});

test('should return Add Workout action object with defaults', () => {
    const action = addWorkout();
    expect(action).toEqual({
        type: 'ADD_WORKOUT',
        workout: {},
        currentWeight: {},
        created: 0,
        id: expect.any(String)
    });
});