import React from 'react';

const AppHeader = ({ toggleMenu }) => {
    return (
        <div className="app-header">
            <button className="app-header__hamburger-button" onClick={() => {toggleMenu()}} >
                <i className="fas fa-bars"></i>
            </button>
            <h1>flext</h1>
        </div>
    );
}
 
export default AppHeader;