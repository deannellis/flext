import { setTargetMacros, updateMacro, resetCurrent } from '../../actions/macros';

test('should return Set Target Macros action object', () => {
    const target = {
        protein: 380,
        carbs: 240,
        fat: 80,
    };
    const action = setTargetMacros(target);

    expect(action).toEqual({
        type: 'SET_TARGET_MACROS',
        target
    });
});

test('should return Set Target Macros action object with default values', () => {
    const action = setTargetMacros();

    expect(action).toEqual({
        type: 'SET_TARGET_MACROS',
        target: {
            protein: 0,
            carbs: 0,
            fat: 0
        }
    });
});

test('should return Update Macro action object', () => {
    const update = {
        macro: 'fat',
        amount: 20
    }
    const action = updateMacro(update);
    
    expect(action).toEqual({
        type: 'UPDATE_MACRO',
        update
    });
});

test('should return Update Macro action object with default values', () => {
    const action = updateMacro();
    
    expect(action).toEqual({
        type: 'UPDATE_MACRO',
        update: { macro: '', amount: 0 }
    });
});

test('should return Reset Current action object', () => {
    const action =  resetCurrent();

    expect(action).toEqual({
        type: 'RESET_CURRENT'
    });
});
