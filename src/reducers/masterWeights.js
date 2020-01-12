const masterWeightsReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_MASTER_WEIGHTS':
            return action.weights;
        case 'UPDATE_MASTER_WEIGHTS':
            let updatedMasterWeights = { ...state };
            const { updates } = action;
    
            // console.log('1', updatedMasterWeights);
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
                                console.log('db1');
                                updatedMasterWeights.chinup.negatives = state.chinup.negatives - 1;
                                updatedMasterWeights.chinup.ups = state.chinup.ups + 1;
                            } else {
                                console.log('db1');
                                updatedMasterWeights.chinup.weight = state.chinup.weight + 2.5;
                            }
                        }
                    }
                }
            }
            return updatedMasterWeights;
        default:
            return state;
    }
}

export default masterWeightsReducer;