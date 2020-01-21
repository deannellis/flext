import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link} from "react-router-dom";
import { startWorkout } from '../actions/inProgressWorkout';
import Tabs from './Tabs';
import Dashboard from './Dashboard';
import WorkoutsTab from './WorkoutsTab';
import Button from './Button';

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

    // componentDidMount() {
    //     if(Object.entries(this.props.masterWeights).length === 0 && this.props.masterWeights.constructor === Object) {
    //         this.props.history.push('/onboarding');
    //     }
    // }

    render() { 
        if(Object.entries(this.props.masterWeights).length === 0 && this.props.masterWeights.constructor === Object) {
            return (
                <>
                    <h2>Welcome to flext!</h2>
                    <p>Let's begin by entering your starting weights</p>
                    <Button variant="primary">
                        <Link to="/onboarding">Enter Weights</Link>
                    </Button>
                </>
            );
        }
        return (
            <>
                <Tabs 
                    activeIndex={this.state.activeTab} 
                    handleSelect={i => this.setState({ activeTab: i })}
                    labels={['Dashboard', 'Workouts']}
                >
                    {this.state.activeTab === 0 && 
                        <Dashboard
                            liftVariant={this.props.liftVariant}
                            masterWeights={this.props.masterWeights} 
                            workouts={this.props.workouts}
                            onStartWorkout={this.onStartWorkout}
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