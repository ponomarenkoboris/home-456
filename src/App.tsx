import React from 'react'
import { Sidebar } from './components/Sidebar'
import { Vk } from './components/Vk'
import { Weather } from "./components/Weather";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import './App.scss'

export default function App() {

    return (
        <section className="app-container">
            <Router>
                <Redirect from={'/'} to={'/vk'} />
                <Sidebar />
                <div className="app-pages">
                    <Route path={'/vk'}>
                        <Vk />
                    </Route>
                    <Route path={'/weather'}>
                        <Weather />
                    </Route>
                </div>
            </Router>
        </section>
    )
}