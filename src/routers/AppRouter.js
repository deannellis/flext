import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route, 
    Link
} from 'react-router-dom';
import Button from '../components/Button';
import HomePage from '../components/HomePage';
import WorkoutsPage from '../components/WorkoutsPage';
import LiftsPage from '../components/LiftsPage';
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
                <Route path="/workouts" >
                    <WorkoutsPage />
                </Route>
                <Route path="/lifts" >
                    <LiftsPage />
                </Route>
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