import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link} from "react-router-dom";
import { startWorkout } from '../actions/inProgressWorkout';
import Tabs from './Tabs';
import Dashboard from './Dashboard';
import WorkoutsTab from './WorkoutsTab';
import LiftsTab from './LiftsTab';
import Button from './Button';
import SideNav from './SideNav';

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
            <div className="page--with-side-nav">
                <SideNav path={this.props.match.path} />
                <div>
                    <h1>Page Content</h1>
                </div>
                {/* <Tabs 
                    activeIndex={this.state.activeTab} 
                    handleSelect={i => this.setState({ activeTab: i })}
                    labels={['Dashboard', 'Workouts', 'Lifts']}
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
                    {this.state.activeTab === 2 && 
                        <LiftsTab />
                    }
                </Tabs> */}
            </div>
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