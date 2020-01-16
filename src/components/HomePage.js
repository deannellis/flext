import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { setMasterWeights } from '../actions/masterWeights';
import { startWorkout } from '../actions/inProgressWorkout';
import Tabs from './Tabs';
import DashboardTab from './DashboardTab';
import WorkoutsTab from './WorkoutsTab';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1
        }
    }

    onStartWorkout = () => {
        this.props.dispatch(startWorkout(this.props.liftVariant));
        this.props.history.push('/workout');
    }

    onMasterWeightsSubmit = (masterWeights) => {
        this.props.dispatch(setMasterWeights(masterWeights));
    }

    render() { 
        return (
            <>
                <Tabs 
                    activeIndex={this.state.activeTab} 
                    handleSelect={i => this.setState({ activeTab: i })}
                    labels={['Dashboard', 'Workouts']}
                >
                    {this.state.activeTab === 0 && 
                        <DashboardTab 
                            masterWeights={this.props.masterWeights} 
                            liftVariant={this.props.liftVariant}
                            onMasterWeightsSubmit={this.onMasterWeightsSubmit}
                            onStartWorkout={this.onStartWorkout}
                            workouts={this.props.workouts}
                        />
                    }
                    {this.state.activeTab === 1 && 
                        <WorkoutsTab 
                            workouts={this.props.workouts}
                        />
                    }
                </Tabs>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        masterWeights: state.masterWeights,
        liftVariant: state.liftVariant,
        workouts: state.workouts,
    };
}
 
export default withRouter(connect(mapStateToProps)(HomePage));