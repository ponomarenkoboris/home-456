import React, { useState, useRef } from 'react';
import './styles/Head.scss'
import { useLocation } from 'react-router';
import { user } from '../../store/userStore';
import { linksList } from './Sidebar';

export function Head() {
    const location = useLocation()
    const days = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat']
    const [time, setTime] = useState<{ hour: number, minutes: number }>({ hour: new Date().getHours(), minutes: new Date().getMinutes() })
    const [isChanging, setIsChanging] = useState<boolean>(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const avatarRef = useRef<HTMLInputElement>(null)

    setTimeout(() => setTime({ hour: new Date().getHours(), minutes: new Date().getMinutes() }), 30_000)

    const submitUserName = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (nameRef && nameRef.current && nameRef.current.value.trim().length > 0) user.setName(nameRef.current.value)
        if (avatarRef && avatarRef.current && avatarRef.current.value.trim().length > 0) user.setAvatar(avatarRef.current.value)
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
            <h1 className="head-page">{linksList.get(location.pathname.split('/')[1])}</h1>
            <form className="head-user" onSubmit={submitUserName}>
                {!isChanging ? (
                    <div className="user__name-wrapper" onClick={() => setIsChanging(true)}>
                        <p className="user__name">{user.name}</p>
                        <img className="user__avatar" src={user.avatar} alt={`${user.name} avatar`} />
                    </div>
                ) : (
                    <div className="user__name-wrapper">
                        <input className="user__name-input name-input" placeholder={user.name} ref={nameRef} />
                        <input className="user__name-input" placeholder="Аватар" ref={avatarRef} />
                    </div>
                )}
                <button
                    className="user_submit-btn"
                    type="submit"
                    style={{ visibility: isChanging ? 'visible' : 'hidden' }}
                >Save
                </button>
            </form>
        </div>
    )
}
