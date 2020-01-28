import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import moment from 'moment'
import { getWorkouts, getDisplayName } from '../utils/workout';
import Button from '../components/Button';
import { addWorkout } from '../actions/workouts';
import { resetWorkout } from '../actions/inProgressWorkout';
import { updateMasterWeights } from '../actions/masterWeights';
import { updateLiftVariant } from '../actions/liftVariant';


class WorkoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
             complete: false,
             created: moment()
        }
    }

    onStartLift = lift => {
        this.props.history.push(`/workout/${lift}`);
    }

    completeWorkout = () => {
        const { inProgressWorkout, masterWeights } = this.props;
        const { created } = this.state;
        const workoutPayload = {
            workout: inProgressWorkout,
            currentWeight: masterWeights,
            created,
        }
        this.props.dispatch(addWorkout(workoutPayload));
        this.props.dispatch(updateMasterWeights(inProgressWorkout));
        this.props.dispatch(updateLiftVariant());
        this.props.dispatch(resetWorkout());
        this.props.history.push(`/home`);
    }

    componentDidMount() {
        let complete = true;
        const { inProgressWorkout } = this.props;
        for(let lift in inProgressWorkout) {
            if(inProgressWorkout[lift] === null) complete = false;
        }
        if(complete) {this.setState({complete});}
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
                                    Completed:  
                                    {this.props.inProgressWorkout[lift] === 0 && lift !== 'chinup' ? ' Last set less than 5 reps' : ''} 
                                    {this.props.inProgressWorkout[lift] === 1 && lift !== 'chinup' ? ' Last set greater than 5 reps' : ''} 
                                    {this.props.inProgressWorkout[lift] === 2 && lift !== 'chinup' ? ' Last set greater than 10 reps' : ''} 
                                    {this.props.inProgressWorkout[lift] === 0 && lift === 'chinup' ? ' Better luck next time' : ''} 
                                    {this.props.inProgressWorkout[lift] === 1 && lift === 'chinup' ? ' All reps completed!' : ''} 
                                </p>
                            ) : (
                                <Button variant="primary" clickHandler={() => {this.onStartLift(lift)}}>begin lift</Button>
                            )}
                        </div>
                    );
                })}
                {}
                {this.state.complete && 
                    <div className="workout-page__lift">
                        <h2>Hell Yeah!</h2>
                        <Button variant="primary" clickHandler={this.completeWorkout}>Finish Workout</Button>
                    </div>
                }
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