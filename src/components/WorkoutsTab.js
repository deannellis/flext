import React from 'react';
import moment from 'moment';
import { getDisplayName } from '../utils/workout';

const WorkoutsTab = ({ workouts }) => {
    return (
        <div className="workouts-tab">
            <div className="workouts-tab__list">
                <h1>{workouts.length} total workouts</h1>
                {workouts.map((workout, i) => {
                    const workoutKeys = Object.keys(workout);
                    return (
                        <div className="workouts-tab__workout">
                            <p className="workouts-tab__workout-number">Workout #{i+1}</p>
                            <div className="empty-grid-cell"></div>
                            <div className="workouts-tab__date">
                                <p>{moment(workout.created).format("MMMM, D")}</p>
                            </div>
                            {workoutKeys.map(key => {
                                if(key == 'id' || key == 'created') return
                                return (
                                    <div className="workouts-tab__lift">
                                        <p className="workouts-tab__workout-name">{getDisplayName(key)}</p>
                                        <p>
                                            Result:  
                                            {workout[key].result === 0 && key !== 'chinup' ? ' Last set less than 5 reps' : ''} 
                                            {workout[key].result === 1 && key !== 'chinup' ? ' Last set greater than 5 reps' : ''} 
                                            {workout[key].result === 2 && key !== 'chinup' ? ' Last set greater than 10 reps' : ''} 
                                            {workout[key].result === 0 && key === 'chinup' ? ' Did not complete all reps' : ''} 
                                            {workout[key].result === 1 && key === 'chinup' ? ' All reps completed!' : ''} 
                                        </p>
                                    </div>
                                );
                            })}
                
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
 
export default WorkoutsTab;