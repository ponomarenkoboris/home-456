import React from 'react'
import { Sidebar } from './components/Sidebar'
import { Vk } from './components/Vk'
import { Weather } from "./components/Weather";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import './App.scss'

export default function App() {

    return (
        <section className="app-container">
            <Router>
                <Sidebar />
                <div className="app-pages">
                    <Redirect from={'/'} to={'/vk'} />
                    <Switch>
                        <Route path={'/vk'}>
                            <Vk />
                        </Route>
                        <Route path={'/weather'}>
                            <Weather />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </section>
    )
}