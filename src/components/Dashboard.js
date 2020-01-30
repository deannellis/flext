import React from 'react';
import Calendar from './Calendar';
import NextWorkout from './NextWorkout';
import MacroTracker from './MacroTracker';

const Dashboard = ({ liftVariant, masterWeights, onStartWorkout, workouts, macros, onSetMacros, onUpdateMacro }) => {
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
            <MacroTracker 
                macros={macros} 
                setMacros={onSetMacros}
                updateMacro={onUpdateMacro}
            ></MacroTracker>
        </div>
    );
}
 
export default Dashboard;