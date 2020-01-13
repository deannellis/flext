import React from 'react';
import Calendar from './Calendar';
import NextWorkout from './NextWorkout';

const Dashboard = (props) => {
    return (
        <div className="dashboard__container">
            <NextWorkout liftVariant={props.liftVariant} masterWeights={props.masterWeights} />
            <div className="dashboard__card">
                <Calendar />
            </div>
        </div>
    );
}
 
export default Dashboard;