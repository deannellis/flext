export const startWorkout = ({
    a = 0,
    b = 0
} = {}) => ({
    type: 'START_WORKOUT',
    a,
    b
});

export const updateWorkout = ({
    updates = {}
}) => ({
    type: 'UPDATE_WORKOUT',
    updates
});

export const resetWorkout = () => ({ type: 'RESET_WORKOUT' });