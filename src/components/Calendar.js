import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
	getMonthWorkouts,
	getWorkoutDays,
	getWorkoutIds,
} from '../utils/workout';
import { LeftArrowIcon, RightArrowIcon } from '../utils/icons';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dateObject: moment(),
		};
		this.getFirstDayOfMonth = this.getFirstDayOfMonth.bind(this);
	}

	getFirstDayOfMonth = () => {
		const { dateObject } = this.state;
		return moment(dateObject).startOf('month').format('d');
	};

	getDaysInMonth = () => {
		const { dateObject } = this.state;
		return dateObject.daysInMonth();
	};

	getCurrentDay = () => {
		const { dateObject } = this.state;
		return dateObject.format('D');
	};

	getMonth = () => {
		const { dateObject } = this.state;
		return dateObject.format('MMMM');
	};

	getYear = () => {
		const { dateObject } = this.state;
		return dateObject.format('YYYY');
	};

	onPrevMonth = () => {
		this.setState((prevState) => ({
			dateObject: prevState.dateObject.subtract(1, 'month'),
		}));
	};

	onNextMonth = () => {
		this.setState((prevState) => ({
			dateObject: prevState.dateObject.add(1, 'month'),
		}));
	};

	handleDayClick = (id) => {
		const { onClickWorkoutDate } = this.props;
		onClickWorkoutDate(id);
	};

	handleKeyPress = (e) => {
		const { toggleMenu } = this.context;
		if (e.key === 'Escape') toggleMenu();
	};

	render() {
		const { workouts } = this.props;
		const { dateObject } = this.state;
		const weekdaysAbbreviated = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
		const monthWorkouts = getMonthWorkouts(workouts, this.getYear());
		const daysWorkedOut = monthWorkouts[dateObject.format('MMMM')]
			? monthWorkouts[dateObject.format('MMMM')]
			: [];
		const workoutDays = getWorkoutDays(
			parseInt(this.getFirstDayOfMonth()),
			this.getDaysInMonth()
		);
		const workoutIds = getWorkoutIds(workouts, this.getMonth());
		const emptyCells = [];
		const daysInMonth = [];
		for (let i = 0; i < this.getFirstDayOfMonth(); i += 1) {
			emptyCells.push(<div className="calendar__day--empty" key={i} />);
		}
		for (let d = 1; d <= this.getDaysInMonth(); d += 1) {
			let workedOut = false;
			let isToday = false;
			let workOutDay = false;
			if (moment().format('MMMM') === this.getMonth()) {
				if (d === this.getCurrentDay()) {
					isToday = true;
				}
			}
			if (daysWorkedOut.includes(d)) workedOut = true;
			if (workoutDays.includes(d)) workOutDay = true;
			daysInMonth.push(
				<div
					className={`calendar__day
                        ${isToday ? 'calendar__day--today' : ''}
                        ${workedOut ? 'calendar__day--worked-out' : ''}
                        ${workOutDay ? 'calendar__day--work-out' : ''}
                    `}
					key={d}
					onClick={
						workedOut
							? () => {
									this.handleDayClick(workoutIds[d]);
							  }
							: () => {}
					}
					onKeyPress={
						workedOut
							? () => {
									this.handleDayClick(workoutIds[d]);
							  }
							: () => {}
					}
					role="presentation"
				>
					{d}
				</div>
			);
		}
		return (
			<div className="calendar">
				<button
					className="calendar__prev-month"
					onClick={() => {
						this.onPrevMonth();
					}}
					type="button"
				>
					<LeftArrowIcon size={24} />
				</button>
				<div className="calendar__month-year">
					{`${this.getMonth()} ${this.getYear()}`}
				</div>
				<button
					className="calendar__next-month"
					onClick={() => {
						this.onNextMonth();
					}}
					type="button"
				>
					<RightArrowIcon size={24} />
				</button>
				{weekdaysAbbreviated.map((day, i) => (
					<div className="calendar__weekday-short-name" key={i}>
						{day}
					</div>
				))}
				{emptyCells}
				{daysInMonth}
			</div>
		);
	}
}
Calendar.propTypes = {
	onClickWorkoutDate: PropTypes.func.isRequired,
	workouts: PropTypes.arrayOf(PropTypes.object),
};
Calendar.defaultProps = {
	workouts: [],
};

export default Calendar;
