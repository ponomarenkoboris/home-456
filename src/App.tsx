import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import './App.scss'
import { Sidebar } from './components/layout/Sidebar'
import { Weather } from "./components/weather/Weather"
import { Head } from './components/layout/Head'
import { Messenger } from './components/messenger/Messenger'
import { GeneralChat } from './components/generalChat/GeneralChat'
import { Login } from './components/layout/Login'
import { TaskTracker } from './components/taskTracker/TaskTracker';

export default function App() {

    return (
        <section className="app-container">
            {localStorage.getItem('user_email') ? (
                <Router>
                    <Head />
                    <div className="app-pages">
                        <Sidebar />
                        <Redirect from={'/'} to={'/weather'} />
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
                    </div>
                </Router>
            ) : (
                <div className="app-login">
                    <Login />
                </div>
            )}
        </section>
    )
}