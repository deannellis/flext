import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import moment from 'moment';
import { startWorkout } from '../actions/inProgressWorkout';
import { getDisplayName } from '../utils/workout';
import SideNav from '../components/SideNav';
import Button from '../components/Button';

const WorkoutsPage = ({ workouts, match, dispatch, history, liftVariant }) => {

    const onStartWorkout = () => {
        dispatch(startWorkout(liftVariant));
        history.push('/workout');
    }

    return (
        <div className="page--with-side-nav">
            <SideNav path={match.path} />
        
            <div className="workouts-page">
                <div className="workouts-page__list">
                    <div className="workouts-page__header">
                        <h1>{workouts.length} total workouts</h1>
                        <Button variant="primary" clickHandler={onStartWorkout}>Start Next Workout</Button>
                    </div>
                    {workouts.map((workout, i) => {
                        const workoutKeys = Object.keys(workout);
                        return (
                            <div className="workouts-page__workout card" key={i}>
                                <p className="workouts-page__workout-number">Workout #{i+1}</p>
                                <div className="empty-grid-cell"></div>
                                <div className="workouts-page__date">
                                    <p>{moment(workout.created).format("MMMM, D")}</p>
                                </div>
                                {workoutKeys.map(key => {
                                    if(key == 'id' || key == 'created') return
                                    return (
                                        <div className="workouts-page__lift" key={key}>
                                            <p className="workouts-page__lift-name">{getDisplayName(key)}</p>
                                            <p className="workouts-page__result">
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
        </div>
    );
}
 
const mapStateToProps = state => {
    return {
        workouts: state.workouts,
        liftVariant: state.liftVariant,
    };
}
 
export default withRouter(connect(mapStateToProps)(WorkoutsPage));