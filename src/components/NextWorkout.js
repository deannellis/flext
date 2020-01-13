import React from 'react';
import { getWorkouts, getDisplayName } from '../utils/workout';
import Button from './Button';

const NextWorkout = (props) => {
    console.log('var', getWorkouts(props.liftVariant));
    return (  
        <div className="next-workout dashboard__card">
            <h2>Next Workout</h2>
            <div className="next-workout__lifts">
                {getWorkouts(props.liftVariant).map(workout => {
                    return (
                        <p key={workout} className="next-workout__lift">
                            {getDisplayName(workout)}
                            <span className="next-workout__weight">
                                {workout !== 'chinup' ? ` @${props.masterWeights[workout]}lbs` : ''}
                            </span>
                        </p>
                    );
                })}
            </div>
            <Button variant="primary" className="next-workout__button">Start workout</Button>
        </div>
    );
}
 
export default NextWorkout;