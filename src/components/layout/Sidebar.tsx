import React from 'react'
import './styles/Sidebar.scss'
import { useHistory } from "react-router-dom"

export const linksList = new Map([
    ['weather', 'Weather'],
    ['messenger', 'Messenger'],
    ['generalChat', 'General Chat'],
    ['taskTracker', 'Task Tracker']
])

export function Sidebar(): React.ReactElement {
    const history = useHistory()
    let links: Array<string[]> = []
    linksList.forEach((name, route) => { links.push([name, route]) })

    return (
        <section className="sidebar-container">
            {links.map(([name, route], idx) => (
                <div key={idx} className="route-link-wrapper" onClick={() => history.push(`/${route}`)}>
                    <p className="route-link">{name}</p>
                </div>
            ))}
        </section>
    )
}