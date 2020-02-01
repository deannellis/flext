import React from 'react';
import Calendar from './Calendar';
import NextWorkout from './NextWorkout';
import MacroTracker from './MacroTracker';

const Dashboard = ({ liftVariant, masterWeights, onStartWorkout, workouts, macros, onSetMacros, onUpdateMacro, menuIsOpen }) => {
    return (
        <div className="side-nav__page-content">
            <div className={menuIsOpen ? 'side-nav__page-scrim' : 'side-nav__page-scrim side-nav__page-scrim--hidden'}></div>
            <div className="dashboard__container side-nav__page-content">
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
        </div>
    );
}
 
export default Dashboard;