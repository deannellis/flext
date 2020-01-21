import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route, 
    Link
} from 'react-router-dom';
import Button from '../components/Button';
import HomePage from '../components/HomePage';
import OnboardingPage from '../components/OnboardingPage';
import WorkoutRouter from './WorkoutRouter';
import AppHeader from '../components/AppHeader';

const AppRouter = () => (
    <Router>
        <div>
            <AppHeader/>
            <Switch>
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route path="/onboarding" >
                    <OnboardingPage />
                </Route>
                <Route path="/workout" >
                    <WorkoutRouter />
                </Route>
                {/* <Route path="/workout/:id" component={Lift} /> */}
                <Route path="/">
                    <h1>Root Route Here!</h1>
                    <Link to="/home">
                        <Button>Go Home</Button>
                    </Link>
                </Route>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;