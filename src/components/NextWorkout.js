import React from 'react';
import { getWorkouts, getDisplayName } from '../utils/workout';
import Button from './Button';

const NextWorkout = (props) => {
    return (  
        <div className="next-workout card">
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
            <Button variant="primary" className="next-workout__button" clickHandler={() => {props.onStartWorkout()}}>Start workout</Button>
        </div>
    );
}
 
export default NextWorkout;