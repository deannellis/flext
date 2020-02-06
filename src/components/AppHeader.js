import React from 'react';
import { HamburgerIcon } from '../utils/icons';

const AppHeader = ({ toggleMenu }) => {
    return (
        <div className="app-header">
            <button className="app-header__hamburger-button" onClick={() => {toggleMenu()}} >
                <HamburgerIcon size={24} />
            </button>
            <h1>flext</h1>
        </div>
    );
}
 
export default AppHeader;