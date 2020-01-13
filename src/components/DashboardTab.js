import React from 'react';
import Dashboard from './Dashboard';
import StartingWeightForm from './StartingWeightForm';

const DashboardTab = (props) => {
    const { masterWeights } = props;
    const submitMasterWeights = (masterWeights) => {
        props.onMasterWeightsSubmit(masterWeights);
    }
    return (
        <>
            {
                Object.entries(masterWeights).length === 0 && masterWeights.constructor === Object ? (
                    <StartingWeightForm onSubmit={submitMasterWeights}/>
                ) : (
                    <Dashboard
                        liftVariant={props.liftVariant}
                        masterWeights={props.masterWeights} 
                        onStartWorkout={props.onStartWorkout}
                    />
                )
            }
        </>
    );
}
 
export default DashboardTab;