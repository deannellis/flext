import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link} from "react-router-dom";
import { startWorkout } from '../actions/inProgressWorkout';
import Dashboard from '../components/Dashboard';
import Button from '../components/Button';
import SideNav from '../components/SideNav';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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
                <Dashboard
                    liftVariant={this.props.liftVariant}
                    masterWeights={this.props.masterWeights} 
                    workouts={this.props.workouts}
                    onStartWorkout={this.onStartWorkout}
                />
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