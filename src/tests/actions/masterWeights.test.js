import { setMasterWeights, updateMasterWeights, setWeight } from '../../actions/masterWeights';

test('should return Set Master Weights action object', () => {
    const weights = {
        bench: 79,
        row: 110,
        squat: 164,
        deadlift: 106,
        overhead: 107,
        chinup: { ups: 3, negatives: 2, weight: 0 },
    };
    const action = setMasterWeights(weights);

    expect(action).toEqual({
        type: 'SET_MASTER_WEIGHTS',
        weights
    });
});

test('should return Set Master Weights action object with defaults', () => {
    const action = setMasterWeights();

    expect(action).toEqual({
        type: 'SET_MASTER_WEIGHTS',
        weights: {
            bench: 0,
            row: 0,
            squat: 0,
            deadlift: 0,
            overhead: 0,
            chinup: {
                ups: 0,
                negatives: 5,
                weight: 0
            }
        }
    });
});

test('should return Update Master Weights action object', () => {
    const updates = {
        squat: 1,
        overhead: 2,
        chinup: 0,
    };
    const { squat, overhead, chinup } = updates;
    const action = updateMasterWeights({ ...updates });
    
    expect(action).toEqual({
        type: 'UPDATE_MASTER_WEIGHTS',
        updates: {
            bench: null,
            row: null,
            squat,
            deadlift: null,
            overhead,
            chinup
        }
    })
});

test('should return Update Master Weights action object with defaults', () => {
    const updates = {
        bench: null,
        row: null,
        squat: null,
        deadlift: null,
        overhead: null,
        chinup: null,
    };
    const action = updateMasterWeights();

    expect(action).toEqual({
        type: 'UPDATE_MASTER_WEIGHTS',
        updates
    })
});

test('should return Set Weight action object', () => {
    const update = { bench: 85 };
    const action = setWeight({ update });

    expect(action).toEqual({
        type: 'SET_WEIGHT',
        update
    })
});

test('should return Set Weight action object with defaults', () => {
    const action = setWeight();

    expect(action).toEqual({
        type: 'SET_WEIGHT',
        update: {}
    })
});