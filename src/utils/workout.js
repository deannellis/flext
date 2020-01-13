export const getWorkouts = ({ a = 0, b = 0 }) => {
    let workouts = []
    if(a == 0) {
        workouts.push('overhead', 'chinup')
    } else {
        workouts.push('bench', 'row')
    }
    if(b == 0 || b == 2) {
        workouts.push('squat');
    } else {
        workouts.push('deadlift');
    }
    return workouts;
}

export const getDisplayName = name => {
    switch(name) {
        case 'bench':
            return 'Bench Press';
        case 'row':
            return 'Row';
        case 'squat':
            return 'Squat';
        case 'deadlift':
            return 'Deadlift';
        case 'overhead':
            return 'Overhead Press';
        case 'chinup':
            return 'Chin-Ups';
        default:
            return name;
    }
};