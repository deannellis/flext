import inProgressWorkoutReducer from '../../reducers/inProgressWorkout';

test('should set default state', () => {
    const state = inProgressWorkoutReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should setup correct lifts given lift variant {a: 0, b: 0 || 2}', () => {
    const actionVar1 = {
        type: 'START_WORKOUT',
        a: 0,
        b: 0
    }
    const actionVar2 = {
        type: 'START_WORKOUT',
        a: 0,
        b: 2
    }
    const stateVar1 = inProgressWorkoutReducer({}, actionVar1);
    const stateVar2 = inProgressWorkoutReducer({}, actionVar2);
    
    expect(stateVar1).toEqual({
        overhead: null,
        chinup: null,
        squat: null
    });
    expect(stateVar1).toEqual(stateVar2);
});

test('should setup correct lifts given lift variant {a: 1, b: 1}', () => {
    const action = {
        type: 'START_WORKOUT',
        a: 1,
        b: 1
    }
    const state = inProgressWorkoutReducer({}, action);

    expect(state).toEqual({
        bench: null,
        row: null,
        deadlift: null
    })
});

test('should update inProgressWorkout state given updates', () => {
    const prevState = {
        bench: null,
        row: null,
        deadlift: null
    };
    const action = {
        type: 'UPDATE_WORKOUT',
        updates: { bench: 1 }
    }
    const state = inProgressWorkoutReducer(prevState, action);

    expect(state).toEqual({
        bench: 1,
        row: null,
        deadlift: null
    })
});

test('should reset inProgressWorkout state', () => {
    const prevState = {
        bench: 1,
        row: 1,
        deadlift: 1
    };
    const action = { type: 'RESET_WORKOUT' };
    const state = inProgressWorkoutReducer(prevState, action);
    
    expect(state).toEqual({});
});