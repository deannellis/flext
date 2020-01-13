import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { setMasterWeights } from '../actions/masterWeights';
import { startWorkout } from '../actions/inProgressWorkout';
import Tabs from './Tabs';
import DashboardTab from './DashboardTab';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0
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
                    labels={['Dashboard', 'Tab 2']}
                >
                    {this.state.activeTab === 0 && 
                        <DashboardTab 
                            masterWeights={this.props.masterWeights} 
                            liftVariant={this.props.liftVariant}
                            onMasterWeightsSubmit={this.onMasterWeightsSubmit}
                            onStartWorkout={this.onStartWorkout}
                        />
                    }
                    {this.state.activeTab === 1 && <p>Tab 2 content</p>}
                </Tabs>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        masterWeights: state.masterWeights,
        liftVariant: state.liftVariant
    };
}
 
export default withRouter(connect(mapStateToProps)(HomePage));