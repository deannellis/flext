import React, { Component } from 'react';
import moment from 'moment';

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


    render() { 
        const weekdaysAbbreviated = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        let emptyCells = [];
        let daysInMonth = [];
        for(let i = 0; i < this.getFirstDayOfMonth(); i++) {
            emptyCells.push(
                <div className="calendar__day--empty" key={i}></div>
            );
        }
        for(let d = 1; d <= this.getDaysInMonth(); d++) {
            let isToday = false;
            if(moment().format("MMMM") == this.getMonth()) {
                if(d == this.getCurrentDay()) {
                    isToday = true;
                }
            }
            daysInMonth.push(
                <div className={isToday ? 'calendar__day--today' : 'calendar__day'} key={d}>{d}</div>
            );
        }
        return (
            <div className="calendar">
                <div className="calendar__prev-month" onClick={e => {this.onPrevMonth()}}> &lt; </div>
                <div className="calendar__month-year">{this.getMonth() + ' ' + this.getYear()}</div>
                <div className="calendar__next-month" onClick={e => {this.onNextMonth()}}> &gt; </div>
                {weekdaysAbbreviated.map((day, i) => (
                    <div className="calendar__weekday-short-name" key={i} >{day}</div>
                ))}
                {emptyCells}
                {daysInMonth}
            </div>
        );
    }
}
 
export default Calendar;
