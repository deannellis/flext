import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link} from "react-router-dom";
import moment from 'moment';

import { startWorkout } from '../actions/inProgressWorkout';
import { setTargetMacros, updateMacro, setCurrentDate, resetCurrent } from '../actions/macros';
import Button from '../components/Button';
import SideNav from '../components/SideNav';
import Calendar from '../components/Calendar';
import NextWorkout from '../components/NextWorkout';
import MacroTracker from '../components/MacroTracker';
import { MenuContext } from '../context/menu-context';

export class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: moment()
        }
        this.onSetMacros = this.onSetMacros.bind(this);
    }

    onStartWorkout = () => {
        this.props.onStartWorkout(this.props.liftVariant);
        this.props.history.push('/workout');
    }

    onSetMacros = macros => { this.props.onSetMacros(macros) }

    onUpdateMacro = update => { this.props.onUpdateMacro(update) }

    onClickWorkoutDate = id => {
        this.props.history.push(`/workouts/${id}`);
    }

    // componentDidMount() {
    //     const { dateObject } = this.props.macros;
    //     const { today } = this.state;
    //     console.log(moment.isMoment(dateObject))
    //     const formattedDateObject = dateObject.format("YYYY");
    //     // const result = today.isSame(dateObject, 'day');
    //     if(dateObject === null || dateObject === 0) {
    //         console.log('SETTING DATE DUE TO NULL OR 0 VALUE');
    //         this.props.dispatch(setCurrentDate({ currentDate: today }));
    //     }
    //     // }else if(!(moment().isSame(dateObject, 'day'))) {
    //     //     console.log('RESETING CURRENT MACROS BASED ON OUTDATED DATE');
    //     //     this.props.dispatch(resetCurrent());
    //     //     this.props.dispatch(setCurrentDate({ currentDate: today }));
    //     // }
    // }

    componentWillUnmount() { this.context.toggleMenu() }

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
        let { menuIsOpen, toggleMenu } = this.context;

        return (
            <div className="page--with-side-nav">
                <SideNav path={this.props.match.path} />
                <div className="side-nav__page-content">
                    <div 
                        className={menuIsOpen ? 'side-nav__page-scrim' : 'side-nav__page-scrim side-nav__page-scrim--hidden'}
                        onClick={toggleMenu}
                    ></div>
                    <div className="dashboard__container side-nav__page-content">
                        <NextWorkout 
                            liftVariant={this.props.liftVariant} 
                            masterWeights={this.props.masterWeights} 
                            onStartWorkout={this.onStartWorkout}
                        />
                        <div className="card">
                            <Calendar 
                                workouts={this.props.workouts} 
                                onClickWorkoutDate={this.onClickWorkoutDate}
                            />
                        </div>
                        <MacroTracker 
                            macros={this.props.macros} 
                            setMacros={this.onSetMacros}
                            updateMacro={this.onUpdateMacro}
                        ></MacroTracker>
                    </div>
                </div>
            </div>
        );
    }
}
HomePage.contextType = MenuContext;
HomePage.defaultProps = {
    masterWeights: {
        bench: 0,
        row: 0,
        squat: 0,
        deadlift: 0,
        overhead: 0,
        chinup: {}
    },
    liftVariant: { a:0, b:0 },
    workouts: [],
    macros: {
        target: {
            protein: 0,
            carbs: 0,
            fat: 0,
        },
        current: {
            protein: 0,
            carbs: 0,
            fat: 0,
        },
    },
    match: {
        path: ''
    }
};

const mapStateToProps = state => ({
    masterWeights: state.masterWeights,
    liftVariant: state.liftVariant,
    workouts: state.workouts,
    macros: state.macros,
});
const mapDispatchToProps = dispatch => ({
    onStartWorkout: liftVariant => {
        dispatch(startWorkout(liftVariant));
    },
    onSetMacros: macros => {
        dispatch(setTargetMacros(macros));
    },
    onUpdateMacro: update => {
        dispatch(updateMacro(update));
    },
});
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));