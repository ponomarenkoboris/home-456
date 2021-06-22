import React from 'react'
import './styles/Sidebar.scss'
import { useHistory } from "react-router-dom"

export function Sidebar(): React.ReactElement {
    const history = useHistory()
    const linksList  = {
        'messenger': 'Messenger',
        'weather': 'Weather',
        'generalChat': 'General chat'
    }

    return (
        <section className="sidebar-container">
            {Object.entries(linksList).map((arr, idx) => (
                <div key={idx} className="route-link-wrapper" onClick={() => history.push(`/${arr[0]}`)}>
                    <p className="route-link">{arr[1]}</p>
                </div>
            ))}
        </section>
    )
}