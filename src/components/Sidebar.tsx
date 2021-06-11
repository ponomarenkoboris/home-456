import React, { useState } from 'react'
import './styles/Sidebar.scss'
import { useHistory } from "react-router-dom"

const LocalTime = (): React.ReactElement => {
    const days: Array<string> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const [date, setDate] = useState<string>('')
    setInterval(() => {
        setDate(new Date().toLocaleTimeString())
    }, 1000)

    // TODO complete date styles
    return (
        <>
            <p className="current-date-wrapper">
                <span className="current-date_date">{days[new Date().getDay() - 1]}</span>
                :
                <span className="current-date_time"> {date}</span>
            </p>
        </>
    )
}

export function Sidebar(): React.ReactElement {
    const history = useHistory()
    const arr: Array<string> = ['vk', 'insta', 'facebook', 'twitter', 'weather']

    return (
        <section className="sidebar-container">
            <div className="current-date">
                <LocalTime />
            </div>
            {arr.map((link, idx) => (
                <div key={idx} className="route-link-wrapper" onClick={() => history.push(`/${link}`)}>
                    <p className="route-link">{link}</p>
                </div>
            ))}
        </section>
    )
}