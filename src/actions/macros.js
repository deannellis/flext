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

export const updateMacro = ({
    macro = '',
    amount = 0
} = {}) => ({
    type: 'UPDATE_MACRO',
    update: {
        macro,
        amount
    }
})

export const setCurrentDate = ({
    currentDate = 0
} = {}) => ({
    type: 'SET_CURRENT_DATE',
    currentDate
})

export const resetCurrent = () => ({type: 'RESET_CURRENT'})