import React from 'react';
import Dashboard from './Dashboard';
import StartingWeightForm from './StartingWeightForm';

const DashboardTab = ({ masterWeights, liftVariant, onStartWorkout, workouts }) => {
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
                        liftVariant={liftVariant}
                        masterWeights={masterWeights} 
                        onStartWorkout={onStartWorkout}
                        workouts={workouts}
                    />
                )
            }
        </>
    );
}
 
export default DashboardTab;