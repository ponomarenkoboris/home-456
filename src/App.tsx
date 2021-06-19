import React from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { Weather } from "./components/weather/Weather"
import { Head } from './components/layout/Head'
import { Messenger } from './components/messenger/Messenger'
import { Login } from './components/layout/Login'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import './App.scss'

export default function App() {

    return (
        <section className="app-container">
            {localStorage.getItem('user_email') ? (
                <Router>
                    <Head />
                    <div className="app-pages">
                        <Sidebar />
                        <Redirect from={'/'} to={'/messenger'} />
                        <Switch>
                            <Route path={'/weather'}>
                                <Weather />
                            </Route>
                            <Messenger />
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