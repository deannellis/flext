const workoutsReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_WORKOUT':
            console.log('da action', action);
            const { workout, created, currentWeight, id } = action;
            let newWorkout = {};
            for(let key in workout) {
                newWorkout = {
                    ...newWorkout,
                    [key]: {
                        weight: currentWeight[key],
                        result: workout[key]
                    }
                }
            }
            newWorkout = {
                ...newWorkout,
                created,
                id
            }
            return [ ...state, newWorkout ];
        default:
            return state;
    }
}

export default workoutsReducer;