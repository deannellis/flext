import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import moment from 'moment';
import { Trail } from 'react-spring/renderprops';

import { startWorkout } from '../actions/inProgressWorkout';
import { getDisplayName } from '../utils/workout';
import SideNav from '../components/SideNav';
import Button from '../components/Button';
import { MenuContext } from '../context/menu-context';

export class WorkoutsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    onStartWorkout = () => {
        this.props.dispatch(startWorkout(this.props.liftVariant));
        this.props.history.push('/workout');
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        if(id !== undefined && document.getElementById(id) !== null) {
            document.getElementById(id).scrollIntoView({
                behavior: 'smooth'
            });
        }

    }
    componentWillUnmount() { this.context.toggleMenu() }

    render() { 
        let { menuIsOpen } = this.context;
        let { workouts } = this.props;
        workouts.sort((a, b) => new Date(b.created) - new Date(a.created));
        return (
            <div className="page--with-side-nav">
                <SideNav path={this.props.match.path} />
            
                <div className="workouts-page side-nav__page-content">
                    <div className={menuIsOpen ? 'side-nav__page-scrim' : 'side-nav__page-scrim side-nav__page-scrim--hidden'}></div>
                    <div className="workouts-page__list">
                        <div className="workouts-page__header">
                            <h1>{workouts.length} total workouts</h1>
                            <Button variant="primary" clickHandler={this.onStartWorkout}>Start Next Workout</Button>
                        </div>
                        <Trail
                            items={workouts}
                            keys={workout => workout.id}
                            from={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
                            to={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
                        >
                            {(workout, i) => props => {
                                const workoutKeys = Object.keys(workout);
                                return (
                                    <div className="workouts-page__workout card" style={props} id={workout.id}>
                                        <p className="workouts-page__workout-number">Workout #{workouts.length - i}</p>
                                        <div className="empty-grid-cell"></div>
                                        <div className="workouts-page__date">
                                            <p>{moment(workout.created).format("MMMM, D")}</p>
                                        </div>
                                        {workoutKeys.map(key => {
                                            if(key == 'id' || key == 'created') return
                                            return (
                                                <div className="workouts-page__lift" key={key}>
                                                    <p className="workouts-page__lift-name">
                                                        {getDisplayName(key)}
                                                        <span>
                                                            {key !== 'chinup' ? ` @${workout[key].weight}lbs` : ''}
                                                        </span>
                                                    </p>
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
                            }}
                        </Trail>
                    </div>
                </div>
            </div>
        );
    }
}
WorkoutsPage.contextType = MenuContext;
WorkoutsPage.defaultProps = {
    workouts: [],
    liftVariant: { a:0, b:0 },
    match: { params: { id: '' } }
};
 
const mapStateToProps = state => {
    return {
        workouts: state.workouts,
        liftVariant: state.liftVariant,
    };
}
 
export default withRouter(connect(mapStateToProps)(WorkoutsPage));