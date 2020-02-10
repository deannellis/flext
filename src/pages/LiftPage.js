import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';

import { updateWorkout } from '../actions/inProgressWorkout';
import { getDisplayName, getWarmupWeights, getWeightDistribution, roundWeight } from '../utils/workout';
import { LeftArrowIcon } from '../utils/icons';
import Button from '../components/Button';
import { MenuContext } from '../context/menu-context';

export class LiftPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() { this.context.setPageMenu(false) }
    componentWillUnmount() { this.context.setPageMenu(true) }

    completeLift = (result) => {
        const liftResult = {updates: {[this.props.match.params.id]: result}}
        console.log(liftResult);
        this.props.dispatch(updateWorkout(liftResult));
        this.props.history.push('/workout');
    }

    render() { 
        let { id } = this.props.match.params;
        const workWeight = this.props.masterWeights[id];
        const workReps = ['5 reps', '5 reps', 'AMRAP*'];
        const { negatives, ups, weight } = this.props.masterWeights.chinup;
        return (
            <div className="lift-page__wrapper">
                <div className="lift-page">
                    <div className="lift-page__card card">
                        <h2>
                            {getDisplayName(id)}
                        </h2>
                        {id === 'chinup' ? (
                            <div>
                                <h3>Complete:</h3>
                                <p className="lift-page__chinup-title">3 sets of</p>
                                <div className="lift-page__chinups">
                                    {negatives === 0 ? '' : (
                                        <div className="lift-page__chinup">
                                            <p>{negatives}</p>
                                            <span>negatives</span>
                                        </div>
                                    )}
                                    {ups === 0 ? '' : (
                                        <div className="lift-page__chinup">
                                            <p>{ups}</p>
                                            <span>chin-ups</span>
                                        </div>
                                    )}
                                    {weight === 0 ? '' : (
                                        <div className="lift-page__chinup">
                                            <p>{weight}</p>
                                            <span>lbs</span>
                                        </div>
                                    )}
                                </div>
                                <h3>Enter your results:</h3>
                                <p>Were you able to complete all sets and reps?</p>
                                <Button variant="primary" clickHandler={() => {this.completeLift(1)}}>Yes</Button>
                                <Button clickHandler={() => {this.completeLift(0)}}>No</Button>
                            </div>
                        ) : (
                            <>
                                <div className="lift-page__tables">
                                    <div id="warm-up" className="lift-page__table">
                                        <h3>Warm-Up</h3>
                                        {getWarmupWeights(workWeight).map((weight, i) => (
                                            <div key={i} className="lift-page__sets">
                                                <div className="lift-page__set">
                                                    <span>Set {i + 1}</span>
                                                    <p>5 reps @{roundWeight(weight)}lbs</p>
                                                </div>
                                                <div className="lift-page__distributed">
                                                    {getWeightDistribution(weight).map((distWeight, i) => (
                                                        <div key={i} className="lift-page__distributed-item">
                                                            <span>
                                                                {i === 0 && 'LEFT'}
                                                                {i === 1 && 'BAR'}
                                                                {i === 2 && 'RIGHT'}
                                                            </span>
                                                            <p>{roundWeight(distWeight)}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="lift-page__table">
                                        <h3>Work</h3>
                                        {workReps.map((rep, i) => (
                                            <div key={i} className="lift-page__sets">
                                                    <div className="lift-page__set">
                                                        <span>Set {i + 1}</span>
                                                        <p>{rep} @{workWeight}lbs</p>
                                                    </div>
                                                    <div className="lift-page__distributed">
                                                        {getWeightDistribution(workWeight).map((distWeight, i) => (
                                                            <div key={i} className="lift-page__distributed-item">
                                                                <span>
                                                                    {i === 0 && 'LEFT'}
                                                                    {i === 1 && 'BAR'}
                                                                    {i === 2 && 'RIGHT'}
                                                                </span>
                                                                <p>{distWeight}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p>*as many reps as possible </p>
                                <h3 className="lift-page__results-title">Enter your results</h3>
                                <p>On your last set how many reps did you complete?</p>
                                <Button clickHandler={() => {this.completeLift(0)}}>Less than 5</Button>
                                <Button clickHandler={() => {this.completeLift(1)}}>Greater than 5</Button>
                                <Button clickHandler={() => {this.completeLift(2)}}>Greater than 10</Button>
                            </>
                        )}
                    </div>
                    <button className="lift-page__action-button action-button" onClick={() => { this.props.history.goBack() }} >
                        <LeftArrowIcon fill="rgba(26, 33, 46, .84)" size={24} />
                        <span>Back</span>
                    </button>
                </div>
            </div>
        );
    }
}
LiftPage.contextType = MenuContext;
LiftPage.defaultProps = {
    workouts: [],
    masterWeights: {
        bench: 0,
        row: 0,
        squat: 0,
        deadlift: 0,
        overhead: 0,
        chinup: {}
    },
    match: {
        params: {}
    }
};
 
const mapStateToProps = state => {
    return {
        masterWeights: state.masterWeights,
    };
}
 
export default withRouter(connect(mapStateToProps)(LiftPage));