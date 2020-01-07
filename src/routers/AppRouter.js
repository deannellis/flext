import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, 
    Link
} from 'react-router-dom';

import HomePage from '../components/HomePage';

const AppRouter = () => (
    <Router>
        <div>
            {/* TODO: create layout wrapper */}
            <Switch>
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route path="/">
                    <h1>Root Route Here!</h1>
                </Route>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;