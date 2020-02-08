import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import moment from 'moment';
import { Trail } from 'react-spring/renderprops';

import { getWorkouts, getDisplayName, getEmoji } from '../utils/workout';
import Button from '../components/Button';
import { addWorkout } from '../actions/workouts';
import { resetWorkout } from '../actions/inProgressWorkout';
import { updateMasterWeights } from '../actions/masterWeights';
import { updateLiftVariant } from '../actions/liftVariant';
import { LeftArrowIcon } from '../utils/icons';
import { MenuContext } from '../context/menu-context';

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
        if(complete) {this.setState({ complete })}
        this.context.setPageMenu(false);
    }
    componentWillUnmount() { this.context.setPageMenu(true) }

    render() { 
        const { negatives, ups, weight } = this.props.masterWeights.chinup;
        const emojis = [ getEmoji(), getEmoji(), getEmoji(), ]
        return (
            <div className="workout-page__wrapper">
                <div className="workout-page">
                    <h1>{`Workout #${this.props.workouts.length +1}`}</h1>
                    {this.state.complete && 
                        <div className="workout-page__lift card">
                            <h2>Hell Yeah!</h2>
                            <Button variant="primary" clickHandler={this.completeWorkout}>Finish Workout</Button>
                        </div>
                    }
                    <Trail
                        items={getWorkouts(this.props.liftVariant)}
                        keys={lift => lift}
                        from={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
                        to={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
                    >
                        {(lift) => props => (
                            <div className="workout-page__lift card" style={props}>
                                <h2>
                                    {getDisplayName(lift)}
                                </h2>
                                <p>{
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

                                        {this.props.inProgressWorkout[lift] === 1 && lift !== 'chinup' ? ' Last set greater than 5 reps ' : ''} 
                                        {this.props.inProgressWorkout[lift] === 1 && lift !== 'chinup' && <span>{emojis[0]}</span>} 

                                        {this.props.inProgressWorkout[lift] === 2 && lift !== 'chinup' ? ' Last set greater than 10 reps ' : ''}
                                        {this.props.inProgressWorkout[lift] === 2 && lift !== 'chinup' && <span>{emojis[1]}</span>}

                                        {this.props.inProgressWorkout[lift] === 0 && lift === 'chinup' ? ' Better luck next time' : ''} 
                                        {this.props.inProgressWorkout[lift] === 1 && lift === 'chinup' ? ' All reps completed! ' : ''}
                                        {this.props.inProgressWorkout[lift] === 1 && lift === 'chinup' && <span>{emojis[2]}</span>}
                                    </p>
                                ) : (
                                    <Button variant="primary" clickHandler={() => {this.onStartLift(lift)}}>begin lift</Button>
                                )}
                            </div>
                        )}
                    </Trail>
                    <button className="lift-page__action-button action-button" onClick={() => { this.props.history.goBack() }} >
                        <LeftArrowIcon fill="rgba(26, 33, 46, .84)" size={24} />
                        <span>Back</span>
                    </button>
                </div>
            </div>
        );
    }
}
WorkoutPage.contextType = MenuContext;
 

const mapStateToProps = state => {
    return {
        masterWeights: state.masterWeights,
        liftVariant: state.liftVariant,
        workouts: state.workouts,
        inProgressWorkout: state.inProgressWorkout
    };
}
 
export default withRouter(connect(mapStateToProps)(WorkoutPage));