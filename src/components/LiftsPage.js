import React from 'react';
import { withRouter } from "react-router-dom";
import SideNav from './SideNav';

const LiftsPage = ({ match }) => {
    return (
        <div className="page--with-side-nav">
            <SideNav path={match.path} />
            <h1>Lifts Page</h1>
        </div>
    );
}
 
export default withRouter(LiftsPage);