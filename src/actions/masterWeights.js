export const setMasterWeights = ({
    bench = 0,
    row = 0,
    squat = 0,
    deadlift = 0,
    overhead = 0,
    chinup = {
        ups: 0,
        negatives: 5,
        weight: 0
    }
} = {}) => ({
    type: 'SET_MASTER_WEIGHTS',
    weights: {
        bench,
        row,
        squat,
        deadlift,
        overhead,
        chinup
    }
});

export const updateMasterWeights = ({
    bench = null,
    row = null,
    squat = null,
    deadlift = null,
    overhead = null,
    chinup = null
} = {}) => ({
    type: 'UPDATE_MASTER_WEIGHTS',
    updates: {
        bench,
        row,
        squat,
        deadlift,
        overhead,
        chinup
    }
});

export const setWeight = ({
    update = {}
}) => ({
    type: 'SET_WEIGHT',
    update
})