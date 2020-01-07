import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, 
    Link
} from 'react-router-dom';

const AppRouter = () => (
    <Router>
        <div>
            {/* TODO: create layout wrapper */}
            <Switch>
                <Route path="/home">
                    <h1>Homepage Here!</h1>
                </Route>
                <Route path="/">
                    <h1>Root Route Here!</h1>
                </Route>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;