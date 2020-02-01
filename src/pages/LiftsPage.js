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

class LiftsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            activeTab: 0,
            updateFormIsOpen: false,
        }
    }

    updateLiftWeight = update => {
        this.props.dispatch(setWeight({ update }));
        console.log('tit',update)
    }

    getData = () => {
        const { workouts } = this.props;
        let selectedLift = lifts[this.state.activeTab];
        console.log(selectedLift);
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
                        <div className="card">
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
 
const mapStateToProps = state => {
    return {
        workouts: state.workouts,
        masterWeights: state.masterWeights,
    };
}
 
export default withRouter(connect(mapStateToProps)(LiftsPage));