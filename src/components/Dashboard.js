import React from 'react';
import Calendar from './Calendar';
import NextWorkout from './NextWorkout';

const Dashboard = ({ liftVariant, masterWeights, onStartWorkout, workouts }) => {
    return (
        <div className="dashboard__container">
            <NextWorkout 
                liftVariant={liftVariant} 
                masterWeights={masterWeights} 
                onStartWorkout={onStartWorkout}
            />
            <div className="card">
                <Calendar workouts={workouts} />
            </div>
        </div>
    );
}
 
export default Dashboard;