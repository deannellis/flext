import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";
import { getWorkouts, getDisplayName } from '../utils/workout';
import Button from '../components/Button';
import Lift from '../components/Lift';

const WorkoutRouter = (props) => {
    const { negatives, ups, weight } = props.masterWeights.chinup;
    let match = useRouteMatch();
    
    return (
        <Router>
            <Switch>
                <Route path={`${match.path}/:id`}>
                    <Lift />
                </Route>
                <Route path={match.path}>
                    <div className="workout-page">
                        <p>{match.path}</p>
                        <h1>{`Workout #${props.workouts.length +1}`}</h1>
                        {getWorkouts(props.liftVariant).map(lift => {
                            return (
                                <div key={lift} className="workout-page__lift">
                                    <h2>
                                        {getDisplayName(lift)}
                                    </h2>
                                    <p className="">{
                                        lift !== 'chinup' ? 
                                        `3 sets of 5 reps @${props.masterWeights[lift]}lbs` 
                                        : 
                                        `
                                            ${negatives === 0 ? '' : negatives + ' negatives'}
                                            ${negatives !== 0 && ups !== 0 ? ', ' : '' }
                                            ${ups === 0 ? '' : ups + ' chin-ups '}
                                            ${weight === 0 ? '' : weight + 'lbs'}

                                        `    
                                    }</p>
                                    <Button variant="primary" clickHandler={() => {props.onStartLift(lift)}}>begin lift</Button>
                                </div>
                            );
                        })}
                    </div>
                </Route>
            </Switch>
        </Router>
    );
}
 
export default WorkoutRouter;