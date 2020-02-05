import macrosReducer from '../../reducers/macros';

const defaultState = {
    target: {
        protein: null,
        carbs: null,
        fat: null,
    },
    current: {
        protein: null,
        carbs: null,
        fat: null,
    },
    dateObject: null,
};

const prevState = {
    target: {
        protein: 100,
        carbs: 100,
        fat: 100,
    },
    current: {
        protein: 10,
        carbs: 10,
        fat: 10,
    },
    dateObject: null,
};

test('should set default state', () => {
    const state = macrosReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultState);
});

test('should set target macros', () => {
    const target = {
        protein: 340,
        carbs: 280,
        fat: 80
    };
    const action = {
        type: 'SET_TARGET_MACROS',
        target
    };
    const state = macrosReducer(defaultState, action);

    expect(state).toEqual({
        target,
        current: {
            protein: null,
            carbs: null,
            fat: null,
        },
        dateObject: {},
    });
});

test('should set current macro value if null', () => {
    const action = {
        type: 'UPDATE_MACRO', 
        update: { macro: 'protein', amount: 20 }
    };
    const state = macrosReducer(defaultState, action);

    expect(state).toEqual({
        target: {
            protein: null,
            carbs: null,
            fat: null,
        },
        current: {
            protein: 20,
            carbs: null,
            fat: null,
        },
        dateObject: null,
    });
});

test('should update current macro', () => {
    const action = {
        type: 'UPDATE_MACRO', 
        update: { macro: 'protein', amount: 20 }
    };
    const state = macrosReducer(prevState, action);

    expect(state).toEqual({
        target: {
            protein: 100,
            carbs: 100,
            fat: 100,
        },
        current: {
            protein: 30,
            carbs: 10,
            fat: 10,
        },
        dateObject: null,
    })
});

test('should reset current macros', () => {
    const action = { type: 'RESET_CURRENT' };
    const state = macrosReducer(prevState, action);

    expect(state).toEqual({
        target: {
            protein: 100,
            carbs: 100,
            fat: 100,
        },
        current: {
            protein: null,
            carbs: null,
            fat: null,
        },
        dateObject: null,
    });
});
