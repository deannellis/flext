import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { MenuContext } from '../context/menu-context';
import { DumbbellIcon, DashboardIcon, GraphIcon } from '../utils/icons';

class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const navList = [
            {
                label: 'Dashboard', 
                icon: 'dashboard',
                path: '/home'
            },
            {
                label: 'Lifts', 
                icon: 'graph',
                path: '/lifts'
            },
            {
                label: 'Workouts', 
                icon: 'dumbbell',
                path: '/workouts'
            },
        ];
        let { menuIsOpen } = this.context;
        const getIcon = name => {
            switch(name) {
                case 'dumbbell':
                    return <DumbbellIcon size={24} />
                case 'dashboard':
                    return <DashboardIcon size={24} />
                case 'graph':
                    return <GraphIcon size={24} />
                default:
                    return <></>
            }
        }

        return (
            <div className="side-nav__container">
                <div className={menuIsOpen ? 'side-nav side-nav--opened' : 'side-nav'}>
                    {navList.map(item => (
                        <Link to={item.path} key={item.path}>
                            <div className={`side-nav__nav-item ${this.props.path == item.path ? 'side-nav__nav-item--selected' : ''}`}>
                                {getIcon(item.icon)}
                                <span>{item.label}</span>
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