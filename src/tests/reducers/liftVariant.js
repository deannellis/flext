import liftVariantReducer from '../../reducers/liftVariant';

test('should set default state', () => {
    const state = liftVariantReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({ a: 0, b: 0 });
});

test('should increment lift variant based off previous state', () => {
    const prevState = { a: 0, b: 0 };
    const state = liftVariantReducer(prevState, { type: 'UPDATE_LIFT_VARIANT' });

    expect(state).toEqual({ a: 1, b: 1 });
});

test('should reset lift variant when max values reached', () => {
    const prevState = { a: 1, b: 2 };
    const state = liftVariantReducer(prevState, { type: 'UPDATE_LIFT_VARIANT' });

    expect(state).toEqual({ a: 0, b: 0 });
});
