import React, { MouseEvent, useState } from 'react';
import './styles/Head.scss'
import { useLocation } from 'react-router';
import { user } from '../store/user';

export function Head() {
    const location = useLocation()
    const days = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [time, setTime] = useState<{ hour: number, minutes: number }>({ hour: new Date().getHours(), minutes: new Date().getMinutes() })

    setTimeout(() => setTime({ hour: new Date().getHours(), minutes: new Date().getMinutes() }), 1000)

    const submitUserName = (e: MouseEvent) => {
        e.preventDefault()
        user.changeName('Boris')
    }

    const changeUserName = (e: MouseEvent) => {
        console.log(e);

        // e.target.innerHTML = `<input placeholder=${user.name}/>`
    }

    return (
        <div className="head-container">
            <div className="head-datetime-container">
                <p className="current_day">{days[new Date().getDay() - 1]}</p>
                <p className="currnet_time">{time.hour < 10 ? '0' + time.hour : time.hour} : {time.minutes < 10 ? '0' + time.minutes : time.minutes}</p>
            </div>
            <h1 className="head-page">{location.pathname.split('').filter(item => item !== '/').join('')}</h1>
            <div className="head-user">
                <div className="user_name-wrapper" onClick={changeUserName}>
                    <h2 className="user_name">{user.name}</h2>
                </div>
                <form>
                    <button className="user_submit-name" onClick={submitUserName}>Save Changes</button>
                </form>
            </div>
        </div>
    )
}
