import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route, 
    Link
} from 'react-router-dom';
import WorkoutRouter from './WorkoutRouter';
import HomePage from '../pages/HomePage';
import WorkoutsPage from '../pages/WorkoutsPage';
import LiftsPage from '../pages/LiftsPage';
import OnboardingPage from '../pages/OnboardingPage';
import AppHeader from '../components/AppHeader';
import Button from '../components/Button';

const AppRouter = ({ toggleMenu, pageHasMenu }) => (
    <Router>
        <div>
            <AppHeader toggleMenu={toggleMenu} pageHasMenu={pageHasMenu} />
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
                <Route path="/workouts/:id" >
                    <WorkoutsPage />
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