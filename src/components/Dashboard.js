import React from 'react';
import Calendar from './Calendar';
import NextWorkout from './NextWorkout';
import MacroTracker from './MacroTracker';

const Dashboard = ({ liftVariant, masterWeights, onStartWorkout, workouts, macros, onUpdateMacros }) => {
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
            <div className="card">
                <MacroTracker macros={macros} updateMacros={onUpdateMacros}></MacroTracker>
            </div>
        </div>
    );
}
 
export default Dashboard;