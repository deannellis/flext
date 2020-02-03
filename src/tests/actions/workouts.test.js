import { addWorkout } from '../../actions/workouts';

test('should return Add Workout action object', () => {
    const workoutData = {
        workout: { bench: 2, row: 2, squat: 2 },
        currentWeight: {
            bench: 79,
            row: 110,
            squat: 164,
            deadlift: 106,
            overhead: 107,
            chinup: { ups: 3, negatives: 2, weight: 0 },
        },
        created: 1000
    };
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