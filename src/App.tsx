import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import './App.scss'
import { ErrorBoundary } from './components/layout/ErrorBoundary'
import { Sidebar } from './components/layout/Sidebar'
import { Head } from './components/layout/Head'
const Weather = lazy(() => import('./components/weather/Weather'))
const Messenger = lazy(() => import('./components/messenger/Messenger'))
const GeneralChat = lazy(() => import('./components/generalChat/GeneralChat'))
const Login = lazy(() => import('./components/layout/Login'))
const TaskTracker = lazy(() => import('./components/taskTracker/TaskTracker'))
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);

export default function App() {
    const classes = useStyles()
    return (
        <section className="app-container">
            {localStorage.getItem('user_email') ? (
                <Router>
                    <Head />
                    <div className="app-pages">
                        <Sidebar />
                        <Redirect from={'/'} to={'/weather'} />
                        <ErrorBoundary>
                            <Suspense fallback={<div className={classes.root}><LinearProgress /></div>}>
                                <Switch>
                                    {/* Weather forecast */}
                                    <Route path={'/weather'}>
                                        <Weather />
                                    </Route>
                                    {/* General Chat */}
                                    <Route path={'/generalChat'}>
                                        <GeneralChat />
                                    </Route>
                                    {/* Messenger */}
                                    <Route path={'/messenger'}>
                                        <Messenger />
                                    </Route>
                                    {/* Task Tracker */}
                                    <Route path={'/taskTracker'}>
                                        <TaskTracker />
                                    </Route>
                                </Switch>
                            </Suspense>
                        </ErrorBoundary>
                    </div>
                </Router>
            ) : (
                <div className="app-login">
                    <ErrorBoundary>
                        <Suspense fallback={<div className={classes.root}><LinearProgress /></div>}>
                            <Login />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            )}
        </section>
    )
}