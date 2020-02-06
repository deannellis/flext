const masterWeightsReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_MASTER_WEIGHTS':
            return action.weights;
        case 'UPDATE_MASTER_WEIGHTS':
            let updatedMasterWeights = { ...state };
            const { updates } = action;
    
            for(let key in updates) {
                if(updates[key] !== null) {
                    if(key !== 'chinup') {
                        let increase = 2.5;
                        if(key == 'squat' || key == 'deadlift') increase = 5;
                        if(updates[key] == 0) {
                            const deload = state[key] / 10;
                            if(state[key] - deload > 44) {
                                updatedMasterWeights[key] = state[key] - deload;
                            } else { updatedMasterWeights[key] = 44}
                        }
                        else if(updates[key] == 1) {
                            updatedMasterWeights[key] = state[key] + increase;
                        }
                        else if(updates[key] == 2) {
                            updatedMasterWeights[key] = state[key] + (increase * 2);
                        }
                    } else {
                        if(updates[key] == 1) {
                            const { ups, negatives, weight } = state[key];
                            if(negatives > 0) {
                                updatedMasterWeights.chinup.negatives = state.chinup.negatives - 1;
                                updatedMasterWeights.chinup.ups = state.chinup.ups + 1;
                            } else {
                                updatedMasterWeights.chinup.weight = state.chinup.weight + 2.5;
                            }
                        }
                    }
                }
            }
            return updatedMasterWeights;
        case 'SET_WEIGHT':
            let setWeightUpdates = { ...state };
            const { update } = action;
            const lift = Object.keys(update)[0];
            const newWeight = update[lift];
            setWeightUpdates[lift] = newWeight;
            return setWeightUpdates;
        default:
            return state;
    }
}

export default masterWeightsReducer;