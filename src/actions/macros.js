export const setTargetMacros = ({
    protein = 0,
    carbs = 0,
    fat = 0
} = {}) => ({
    type: 'SET_TARGET_MACROS',
    target: {
        protein,
        carbs,
        fat
    }
})