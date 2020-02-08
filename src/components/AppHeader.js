import React from 'react';
import { HamburgerIcon } from '../utils/icons';

const AppHeader = ({ toggleMenu, pageHasMenu }) => {
    return (
        <div className="app-header" className={pageHasMenu ? 'app-header' : 'app-header app-header--no-menu'}>
            <button className="app-header__hamburger-button" onClick={() => {toggleMenu()}} >
                <HamburgerIcon size={24} />
            </button>
            <h1>flext</h1>
        </div>
    );
}
 
export default AppHeader;