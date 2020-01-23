import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";
import Lift from '../pages/LiftPage';
import WorkoutPage from '../pages/WorkoutPage';

const WorkoutRouter = (props) => {
    let match = useRouteMatch();
    
    return (
        <Switch>
            <Route path={`${match.path}/:id`}>
                <Lift />
            </Route>
            <Route path={match.path}>
                <WorkoutPage />
            </Route>
        </Switch>
    );
}
 
export default WorkoutRouter;