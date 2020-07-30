import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setWeight } from '../actions/masterWeights';
import { getDisplayName } from '../utils/workout';
import SideNav from '../components/SideNav';
import Tabs from '../components/Tabs';
import LineGraph from '../components/LineGraph';
import LiftCard from '../components/LiftCard';
import MenuContext from '../context/menu-context';

const lifts = ['bench', 'deadlift', 'overhead', 'row', 'squat'];

export class LiftsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
			updateFormIsOpen: false,
			currentLift: lifts[0],
		};
	}

	componentWillUnmount() {
		const { closeMenu } = this.context;
		closeMenu();
	}

	getData = () => {
		const { workouts } = this.props;
		const { activeTab } = this.state;
		const selectedLift = lifts[activeTab];
		const filteredWorkouts = [];
		workouts.forEach((workout) => {
			let workoutWithDate = {};
			if (Object.prototype.hasOwnProperty.call(workout, selectedLift)) {
				workoutWithDate = {
					...workout[selectedLift],
					date: workout.created,
				};
				filteredWorkouts.push(workoutWithDate);
			}
		});
		return filteredWorkouts;
	};

	updateLiftWeight = (update) => {
		const { updateLiftWeight } = this.props;
		updateLiftWeight(update);
	};

	handleKeyPress = (e) => {
		const { toggleMenu } = this.context;
		if (e.key === 'Escape') {
			toggleMenu();
		}
	};

	render() {
		const { menuIsOpen, toggleMenu } = this.context;
		const { match, masterWeights } = this.props;
		const { activeTab, updateFormIsOpen, currentLift } = this.state;
		return (
			<div className="page--with-side-nav">
				<SideNav path={match.path} />
				<div className="lifts-page side-nav__page-content">
					<div
						className={
							menuIsOpen
								? 'side-nav__page-scrim'
								: 'side-nav__page-scrim side-nav__page-scrim--hidden'
						}
						onClick={toggleMenu}
						onKeyPress={this.handleKeyPress}
						role="presentation"
					/>
					<Tabs
						activeIndex={activeTab}
						handleSelect={(i) => {
							this.setState({ activeTab: i, currentLift: lifts[i] });
						}}
						labels={lifts.map((lift) => getDisplayName(lift))}
					>
						<div className="card lifts-page__line-graph">
							<h2>Weight Over Time</h2>
							<LineGraph data={this.getData()} />
						</div>
						<LiftCard
							lift={currentLift}
							weights={masterWeights}
							formIsOpen={updateFormIsOpen}
							toggleForm={() => {
								this.setState((prevState) => ({
									updateFormIsOpen: !prevState.updateFormIsOpen,
								}));
							}}
							updateWeight={this.updateLiftWeight}
						/>
					</Tabs>
				</div>
			</div>
		);
	}
}
LiftsPage.contextType = MenuContext;
LiftsPage.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string,
	}),
	workouts: PropTypes.arrayOf(PropTypes.object),
	masterWeights: PropTypes.shape({
		bench: 0,
		row: 0,
		squat: 0,
		deadlift: 0,
		overhead: 0,
		chinup: PropTypes.object,
	}),
	updateLiftWeight: PropTypes.func.isRequired,
};
LiftsPage.defaultProps = {
	match: { path: '' },
	workouts: [],
	masterWeights: {
		bench: 0,
		row: 0,
		squat: 0,
		deadlift: 0,
		overhead: 0,
		chinup: {},
	},
};

const mapStateToProps = (state) => ({
	workouts: state.workouts,
	masterWeights: state.masterWeights,
});

const mapDispatchToProps = (dispatch) => ({
	updateLiftWeight: (update) => {
		dispatch(setWeight({ update }));
	},
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(LiftsPage)
);
