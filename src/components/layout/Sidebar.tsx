import React from 'react'
import './styles/Sidebar.scss'
import { useHistory } from "react-router-dom"

export function Sidebar(): React.ReactElement {
    const history = useHistory()
    const linksList  = {
        'weather': 'Weather',
        'messenger': 'Messenger',
        'generalChat': 'General chat'
    }

    return (
        <section className="sidebar-container">
            {Object.entries(linksList).map(([route, routeName], idx) => (
                <div key={idx} className="route-link-wrapper" onClick={() => history.push(`/${route}`)}>
                    <p className="route-link">{routeName}</p>
                </div>
            ))}
        </section>
    )
}