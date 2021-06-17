import React, { useState, useRef } from 'react';
import './styles/Head.scss'
import { useLocation } from 'react-router';
import { user } from '../../store/user';

export function Head() {
    const location = useLocation()
    const days = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat']
    const [time, setTime] = useState<{ hour: number, minutes: number }>({ hour: new Date().getHours(), minutes: new Date().getMinutes() })
    const [isChanging, setIsChanging] = useState<boolean>(false)
    const nameRef = useRef<HTMLInputElement>(null)

    setTimeout(() => setTime({ hour: new Date().getHours(), minutes: new Date().getMinutes() }), 30_000)

    const submitUserName = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (nameRef && nameRef.current && nameRef.current.value.trim().length > 0) user.setName(nameRef.current.value)
        setIsChanging(false)
    }

    return (
        <div className="head-container">
            <div className="head-datetime-container">
                <p className="current_daytime">
                    <span className="current_day">{days[new Date().getDay()]}</span>
                    {time.hour < 10 ? '0' + time.hour : time.hour} : {time.minutes < 10 ? '0' + time.minutes : time.minutes}
                </p>
            </div>
            <h1 className="head-page">{location.pathname.split('/')[1]}</h1>
            <form className="head-user" onSubmit={submitUserName}>
                <div className="user_name-wrapper">
                    {!isChanging ?
                        <p className="user_name" onClick={() => isChanging === false && setIsChanging(true)}>{user.name}</p>
                        :
                        <input className="user_name-input" placeholder={user.name} ref={nameRef} />}
                </div>
                <button
                    className="user_submit-btn"
                    onClick={submitUserName}
                    style={{ visibility: isChanging ? 'visible' : 'hidden' }}
                >Save Changes
                </button>
            </form>
        </div>
    )
}
