import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link} from "react-router-dom";
import moment from 'moment';

import { startWorkout } from '../actions/inProgressWorkout';
import { setTargetMacros, updateMacro, setCurrentDate, resetCurrent } from '../actions/macros';
import Dashboard from '../components/Dashboard';
import Button from '../components/Button';
import SideNav from '../components/SideNav';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: moment()
        }
    }

    onStartWorkout = () => {
        this.props.dispatch(startWorkout(this.props.liftVariant));
        this.props.history.push('/workout');
    }

    onSetMacros = macros => { this.props.dispatch(setTargetMacros(macros)) }

    onUpdateMacro = update => {
        this.props.dispatch(updateMacro(update))
    }

    componentDidMount() {
        const { dateObject } = this.props.macros;
        const storedDate = dateObject._d
        const { today } = this.state;
        if(dateObject === null || dateObject === 0) {
            console.log('SETTING DATE DUE TO NULL OR 0 VALUE');
            this.props.dispatch(setCurrentDate({ currentDate: today }));
        }else if(!(moment().isSame(storedDate, 'day'))) {
            console.log('RESETING CURRENT MACROS BASED ON OUTDATED DATE');
            this.props.dispatch(resetCurrent());
            this.props.dispatch(setCurrentDate({ currentDate: today }));
        }
    }

    render() { 
        if(Object.entries(this.props.masterWeights).length === 0 && this.props.masterWeights.constructor === Object) {
            return (
                <>
                    <h2>Welcome to flext!</h2>
                    <p>Let's begin by entering your starting weights</p>
                    <Link to="/onboarding">
                        <Button variant="primary">
                            Enter Weights
                        </Button>
                    </Link>
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
                    macros={this.props.macros}
                    onSetMacros={this.onSetMacros}
                    onUpdateMacro={this.onUpdateMacro}
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
        macros: state.macros,
    };
}
 
export default withRouter(connect(mapStateToProps)(HomePage));