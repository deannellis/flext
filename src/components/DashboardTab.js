import React from 'react';
import StartingWeightForm from './StartingWeightForm';

const DashboardTab = (props) => {
    const { masterWeights } = props;
    return (
        <>
            {
                Object.entries(masterWeights).length === 0 && masterWeights.constructor === Object ? (
                    <StartingWeightForm />
                ) : (
                    <p>Weights!!!</p>
                )
            }
        </>
    );
}
 
export default DashboardTab;