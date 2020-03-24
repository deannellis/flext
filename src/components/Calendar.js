import React, { Component } from 'react';
import moment from 'moment';
import { getMonthWorkouts, getWorkoutDays, getWorkoutIds } from '../utils/workout';
import { LeftArrowIcon, RightArrowIcon } from '../utils/icons';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateObject: moment(),
        }
        this.getFirstDayOfMonth = this.getFirstDayOfMonth.bind(this);
    }

    getFirstDayOfMonth = () => {
        let { dateObject } = this.state;
        return moment(dateObject).startOf('month').format('d');
    };
    getDaysInMonth = () => {
        return this.state.dateObject.daysInMonth();
    };
    getCurrentDay = () => {
        return this.state.dateObject.format("D");
    };
    getMonth = () => {
        return this.state.dateObject.format("MMMM");
    };
    getYear = () => {
        return this.state.dateObject.format("YYYY");
    };
    onPrevMonth = () => {
        this.setState({
            dateObject: this.state.dateObject.subtract(1, 'month')
        });
    };
    onNextMonth = () => {
        this.setState({
            dateObject: this.state.dateObject.add(1, 'month')
        });
    };
    handleDayClick = id => {
        this.props.onClickWorkoutDate(id);
    };


    render() { 
        const weekdaysAbbreviated = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const workouts = getMonthWorkouts(this.props.workouts, this.getYear());
        const daysWorkedOut = workouts[this.state.dateObject.format("MMMM")] ? workouts[this.state.dateObject.format("MMMM")] : [];
        const workoutDays = getWorkoutDays(parseInt(this.getFirstDayOfMonth()), this.getDaysInMonth());
        const workoutIds = getWorkoutIds(this.props.workouts, this.getMonth());
        let emptyCells = [];
        let daysInMonth = [];
        for(let i = 0; i < this.getFirstDayOfMonth(); i++) {
            emptyCells.push(
                <div className="calendar__day--empty" key={i}></div>
            );
        }
        for(let d = 1; d <= this.getDaysInMonth(); d++) {
            let workedOut = false;
            let isToday = false;
            let workOutDay = false;
            if(moment().format("MMMM") == this.getMonth()) {
                if(d == this.getCurrentDay()) {
                    isToday = true;
                }
            }
            if(daysWorkedOut.includes(d)) workedOut = true;
            if(workoutDays.includes(d)) workOutDay = true;
            daysInMonth.push(
                <div 
                    className={`calendar__day
                        ${isToday ? 'calendar__day--today' : ''}
                        ${workedOut ? 'calendar__day--worked-out' : ''}
                        ${workOutDay ? 'calendar__day--work-out' : ''}
                    `} 
                    key={d}
                    onClick={workedOut ? () => {this.handleDayClick(workoutIds[d])} : () => {}}
                >{d}</div>
            );
        }
        return (
            <div className="calendar">
                <div className="calendar__prev-month" onClick={e => {this.onPrevMonth()}}>
                    <LeftArrowIcon size={24} />
                </div>
                <div className="calendar__month-year">{this.getMonth() + ' ' + this.getYear()}</div>
                <div className="calendar__next-month" onClick={e => {this.onNextMonth()}}>
                    <RightArrowIcon size={24} />
                </div>
                {weekdaysAbbreviated.map((day, i) => (
                    <div className="calendar__weekday-short-name" key={i} >{day}</div>
                ))}
                {emptyCells}
                {daysInMonth}
            </div>
        );
    }
}

Calendar.defaultProps = {
    workouts: [],
    onClickWorkoutDate: () => {console.log('workout date clicked')},
}
 
export default Calendar;
