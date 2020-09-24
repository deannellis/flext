import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { startWorkout } from '../actions/inProgressWorkout';
import {
	startSetTargetMacros,
	startUpdateMacro,
	startResetCurrent,
} from '../actions/macros';
import Button from '../components/Button';
import SideNav from '../components/SideNav';
import Calendar from '../components/Calendar';
import NextWorkout from '../components/NextWorkout';
import MacroTracker from '../components/MacroTracker';
import MenuContext from '../context/menu-context';
import ProgramCard from '../components/ProgramCard';

export class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasMasterWeights: true,
		};
		this.onSetMacros = this.onSetMacros.bind(this);
	}

	// componentDidMount() {
	//     const { dateObject } = this.props.macros;
	// // REMOVED 'today: moment(),' from state
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

	componentDidMount() {
		let { masterWeights } = this.props;
		if (masterWeights === null) masterWeights = {};
		const { setPageMenu } = this.context;
		if (
			Object.entries(masterWeights).length === 0 &&
			masterWeights.constructor === Object
		) {
			this.setState({ hasMasterWeights: false });
			setPageMenu(false);
		}
	}

	componentWillUnmount() {
		const { closeMenu, setPageMenu } = this.context;
		const { hasMasterWeights } = this.state;
		closeMenu();
		if (!hasMasterWeights) {
			setPageMenu(true);
		}
	}

	onStartWorkout = () => {
		const { onStartWorkout, history, liftVariant } = this.props;
		onStartWorkout(liftVariant);
		history.push('/workout');
	};

	onSetMacros = (macros) => {
		const { onSetMacros } = this.props;
		onSetMacros(macros);
	};

	onUpdateMacro = (update) => {
		const { onUpdateMacro } = this.props;
		onUpdateMacro(update);
	};

	onResetCurrentMacros = () => {
		const { onResetCurrentMacros } = this.props;
		onResetCurrentMacros();
	};

	onClickWorkoutDate = (id) => {
		const { history } = this.props;
		history.push(`/workouts/${id}`);
	};

	handleKeyPress = (e) => {
		const { toggleMenu } = this.context;
		if (e.key === 'Escape') {
			toggleMenu();
		}
	};

	render() {
		const { match, liftVariant, workouts, macros } = this.props;
		let { masterWeights } = this.props;
		if (masterWeights === null) masterWeights = {};
		if (
			Object.entries(masterWeights).length === 0 &&
			masterWeights.constructor === Object
		) {
			return (
				<div className="homepage__welcome">
					<div className="card">
						<h2>Welcome to flext!</h2>
						<p>Let&apos;s begin by entering your starting weights</p>
						<Link to="/onboarding">
							<Button variant="primary">Enter Weights</Button>
						</Link>
					</div>
				</div>
			);
		}
		const { menuIsOpen, toggleMenu } = this.context;

		return (
			<div className="page--with-side-nav">
				<SideNav path={match.path} />
				<div className="side-nav__page-content">
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
					<div className="dashboard__container side-nav__page-content">
						<NextWorkout
							liftVariant={liftVariant}
							masterWeights={masterWeights}
							onStartWorkout={this.onStartWorkout}
						/>
						<div className="card">
							<Calendar
								workouts={workouts}
								onClickWorkoutDate={this.onClickWorkoutDate}
							/>
						</div>
						<MacroTracker
							macros={macros}
							setMacros={this.onSetMacros}
							updateMacro={this.onUpdateMacro}
							resetMacros={this.onResetCurrentMacros}
						/>
						<ProgramCard />
					</div>
				</div>
			</div>
		);
	}
}
HomePage.contextType = MenuContext;
HomePage.propTypes = {
	masterWeights: PropTypes.shape({
		bench: PropTypes.number,
		row: PropTypes.number,
		squat: PropTypes.number,
		deadlift: PropTypes.number,
		overhead: PropTypes.number,
		chinup: PropTypes.object,
	}),
	liftVariant: PropTypes.shape({
		a: PropTypes.number,
		b: PropTypes.number,
	}),
	workouts: PropTypes.arrayOf(PropTypes.object),
	macros: PropTypes.shape({
		target: PropTypes.shape({
			protein: PropTypes.number,
			carbs: PropTypes.number,
			fat: PropTypes.number,
		}),
		current: PropTypes.shape({
			protein: PropTypes.number,
			carbs: PropTypes.number,
			fat: PropTypes.number,
		}),
	}),
	match: PropTypes.shape({
		path: PropTypes.string,
	}),
	history: PropTypes.shape({
		push: PropTypes.func,
	}).isRequired,
	onStartWorkout: PropTypes.func.isRequired,
	onSetMacros: PropTypes.func.isRequired,
	onUpdateMacro: PropTypes.func.isRequired,
	onResetCurrentMacros: PropTypes.func.isRequired,
};
HomePage.defaultProps = {
	masterWeights: {
		bench: 0,
		row: 0,
		squat: 0,
		deadlift: 0,
		overhead: 0,
		chinup: {},
	},
	liftVariant: { a: 0, b: 0 },
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
		path: '',
	},
};

const mapStateToProps = (state) => ({
	masterWeights: state.masterWeights,
	liftVariant: state.liftVariant,
	workouts: state.workouts,
	macros: state.macros,
});
const mapDispatchToProps = (dispatch) => ({
	onStartWorkout: (liftVariant) => {
		dispatch(startWorkout(liftVariant));
	},
	onSetMacros: (macros) => {
		dispatch(startSetTargetMacros(macros));
	},
	onUpdateMacro: (update) => {
		dispatch(startUpdateMacro(update));
	},
	onResetCurrentMacros: () => {
		dispatch(startResetCurrent());
	},
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
