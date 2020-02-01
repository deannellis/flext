import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { MenuContext } from '../context/menu-context';

class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const navList = [
            {
                label: 'Dashboard', 
                icon: 'fa-tachometer-alt',
                path: '/home'
            },
            {
                label: 'Lifts', 
                icon: 'fa-dumbbell',
                path: '/lifts'
            },
            {
                label: 'Workouts', 
                icon: 'fa-calendar-alt',
                path: '/workouts'
            },
        ];
        let { menuIsOpen } = this.context;

        return (
            <div className="side-nav__container">
                <div className={menuIsOpen ? 'side-nav side-nav--opened' : 'side-nav'}>
                    {navList.map(item => (
                        <Link to={item.path} key={item.path}>
                            <div className={`side-nav__nav-item ${this.props.path == item.path ? 'side-nav__nav-item--selected' : ''}`}>
                                <i className={`fas ${item.icon}`}></i>
                                {item.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}
SideNav.contextType = MenuContext;

export default SideNav;