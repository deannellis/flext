import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getWorkouts, getDisplayName } from '../utils/workout';
import Button from '../components/Button';

class WorkoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    onStartLift = lift => {
        console.log(lift);
        this.props.history.push(`/workout/${lift}`);
    }

    render() { 
        const { negatives, ups, weight } = this.props.masterWeights.chinup;
        return (
            <div className="workout-page">
                <h1>{`Workout #${this.props.workouts.length +1}`}</h1>
                {getWorkouts(this.props.liftVariant).map(lift => {
                    return (
                        <div key={lift} className="workout-page__lift">
                            <h2>
                                {getDisplayName(lift)}
                            </h2>
                            <p className="">{
                                lift !== 'chinup' ? 
                                `3 sets of 5 reps @${this.props.masterWeights[lift]}lbs` 
                                : 
                                `
                                    ${negatives === 0 ? '' : negatives + ' negatives'}
                                    ${negatives !== 0 && ups !== 0 ? ', ' : '' }
                                    ${ups === 0 ? '' : ups + ' chin-ups '}
                                    ${weight === 0 ? '' : weight + 'lbs'}

                                `    
                            }</p>
                            {this.props.inProgressWorkout[lift] !== null ? (
                                <p>
                                    Completed: Last set 
                                    {this.props.inProgressWorkout[lift] === 0 && ' less than 5 '} 
                                    {this.props.inProgressWorkout[lift] === 1 && ' greater than 5 '} 
                                    {this.props.inProgressWorkout[lift] === 2 && ' greater than 10 '} 
                                    reps
                                </p>
                            ) : (
                                <Button variant="primary" clickHandler={() => {this.onStartLift(lift)}}>begin lift</Button>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
}
 

const mapStateToProps = state => {
    return {
        masterWeights: state.masterWeights,
        liftVariant: state.liftVariant,
        workouts: state.workouts,
        inProgressWorkout: state.inProgressWorkout
    };
}
 
export default withRouter(connect(mapStateToProps)(WorkoutPage));