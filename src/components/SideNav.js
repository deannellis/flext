import React from 'react';
import { Link } from "react-router-dom";

const SideNav = (props) => {
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

    return (
        <div className="side-nav">
            {navList.map(item => (
                <div className={`side-nav__nav-item ${props.path == item.path ? 'side-nav__nav-item--selected' : ''}`}>
                    <Link to={item.path}>
                        <i className={`fas ${item.icon}`}></i>
                        {item.label}
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default SideNav;