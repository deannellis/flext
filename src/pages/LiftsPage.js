import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { setWeight } from '../actions/masterWeights';
import { getDisplayName } from '../utils/workout';
import SideNav from '../components/SideNav';
import Tabs from '../components/Tabs';
import LineGraph from '../components/LineGraph';
import LiftCard from '../components/LiftCard';
import { MenuContext } from '../context/menu-context';

const lifts = ['bench', 'deadlift', 'overhead', 'row', 'squat']

export class LiftsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            activeTab: 0,
            updateFormIsOpen: false,
        }
    }

    updateLiftWeight = update => { this.props.updateLiftWeight(update) }

    getData = () => {
        const { workouts } = this.props;
        let selectedLift = lifts[this.state.activeTab];
        let filteredWorkouts = [];
        workouts.map(workout => {
            let workoutWithDate = {}
            if(workout.hasOwnProperty(selectedLift)) {
                workoutWithDate = {
                    ...workout[selectedLift],
                    date: workout.created
                }
                filteredWorkouts.push(workoutWithDate)
            }
        })
        return filteredWorkouts
    }

    componentWillUnmount() { this.context.toggleMenu() }

    render() { 
        let { menuIsOpen } = this.context;
        return (
            <div className="page--with-side-nav">
                <SideNav path={this.props.match.path} />
                <div className="lifts-page side-nav__page-content">
                    <div 
                        className={menuIsOpen ? 'side-nav__page-scrim' : 'side-nav__page-scrim side-nav__page-scrim--hidden'}
                        onClick={this.context.toggleMenu}
                    ></div>
                    <Tabs 
                        activeIndex={this.state.activeTab} 
                        handleSelect={i => this.setState({ activeTab: i })}
                        labels={lifts.map(lift => (getDisplayName(lift)))}
                    >   
                        <div className="card lifts-page__line-graph">
                            <h2>Weight Over Time</h2>
                            <LineGraph data={this.getData()}/>
                        </div>
                        <LiftCard 
                            lift={lifts[this.state.activeTab]} 
                            weights={this.props.masterWeights}
                            formIsOpen={this.state.updateFormIsOpen}
                            toggleForm={() => {this.setState({ updateFormIsOpen: !this.state.updateFormIsOpen })}}
                            updateWeight={this.updateLiftWeight}
                        />
                    </Tabs>
                </div>
            </div>
        );
    }
}
LiftsPage.contextType = MenuContext;
LiftsPage.defaultProps = {
    match: { path: '' },
    workouts: [],
    masterWeights: {
        bench: 0,
        row: 0,
        squat: 0,
        deadlift: 0,
        overhead: 0,
        chinup: {}
    },
};
 
const mapStateToProps = state => ({
    workouts: state.workouts,
    masterWeights: state.masterWeights,
});

const mapDispatchToProps = dispatch => ({
    updateLiftWeight: update => {dispatch(setWeight({ update }))},
});
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LiftsPage));