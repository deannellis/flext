import { updateLiftVariant } from '../../actions/liftVariant';

test('should return Update Lift Variant action object', () => {
    const action = updateLiftVariant();
    expect(action).toEqual({ type: 'UPDATE_LIFT_VARIANT' });
});