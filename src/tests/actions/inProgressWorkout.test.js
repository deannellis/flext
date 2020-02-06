import { startWorkout, updateWorkout, resetWorkout } from '../../actions/inProgressWorkout';

test('should return Start Workout action object', () => {
    const liftVariant = { a: 0, b: 0 }
    const action = startWorkout(liftVariant);
    
    expect(action).toEqual({
        type: 'START_WORKOUT',
        ...liftVariant
    });
});

test('should return Start Workout action object with defaults', () => {
    const action = startWorkout();
    expect(action).toEqual({ type: 'START_WORKOUT', a: 0, b: 0 });
});

test('should return Update Workout action object', () => {
    const updates = { row: 2 }
    const action = updateWorkout({ updates });

    expect(action).toEqual({
        type: 'UPDATE_WORKOUT',
        updates
    });
});

test('should return Update Workout action object', () => {
    const updates = { row: 2 }
    const action = updateWorkout({ updates });

    expect(action).toEqual({
        type: 'UPDATE_WORKOUT',
        updates
    });
});

test('should return Update Workout action object with defaults', () => {
    const action = updateWorkout();

    expect(action).toEqual({
        type: 'UPDATE_WORKOUT',
        updates: {}
    });
});

test('should retrun Reset Workout action object', () => {
    const action = resetWorkout();
    expect(action).toEqual({ type: 'RESET_WORKOUT' });
});
