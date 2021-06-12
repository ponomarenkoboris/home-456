import React from 'react'
import './styles/Sidebar.scss'
import { useHistory } from "react-router-dom"

export function Sidebar(): React.ReactElement {
    const history = useHistory()
    const arr: Array<string> = ['messenger', 'weather'];

    return (
        <section className="sidebar-container">
            {arr.map((link, idx) => (
                <div key={idx} className="route-link-wrapper" onClick={() => history.push(`/${link}`)}>
                    <p className="route-link">{link}</p>
                </div>
            ))}
        </section>
    )
}