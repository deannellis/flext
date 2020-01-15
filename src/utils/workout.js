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

export const getWarmupWeights = workWeight => {
    const warmup25 = workWeight * 0.25 > 44 ? workWeight * 0.25 : 44;
    const warmup50 = workWeight * 0.50 > 44 ? workWeight * 0.50 : 44;
    const warmup75 = workWeight * 0.75 > 44 ? workWeight * 0.75 : 44;
    return [ warmup25, warmup50, warmup75 ];
}

export const getWeightDistribution = weight => {
    if(weight === 44) {
        return [ 0, 44, 0]
    }
    const oneSide = (weight - 44) / 2;
    return [ oneSide, 44, oneSide ];
}