import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, 
} from 'react-router-dom';

import HomePage from '../components/HomePage';
import Lift from '../components/Lift';
import WorkoutPage from '../components/WorkoutPage';

const AppRouter = () => (
    <Router>
        <div>
            {/* TODO: create layout wrapper */}
            <Switch>
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route path="/workout" component={WorkoutPage} />
                <Route path="/workout/:id" component={Lift} />
                <Route path="/">
                    <h1>Root Route Here!</h1>
                </Route>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;