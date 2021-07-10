import React, { useState, useRef } from 'react';
import './styles/Head.scss'
import { useLocation } from 'react-router';
import { linksList } from './Sidebar';
import { observer } from 'mobx-react-lite'
import { Button } from '@material-ui/core';
import { user } from '../../store/userStore'

// TODO стилизовать кнопку logout

export const Head = observer(() => {
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

    const logout = () => {
        localStorage.clear()
        window.location.reload()
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
            <form className="head-user" onSubmit={submitUserName} onBlur={() => setIsChanging(false)}>
                {!isChanging ? (
                    <div className="user__name-wrapper" onClick={() => setIsChanging(true) }>
                        <p className="user__name">{user.displayName}</p>
                        <img className="user__avatar" src={user.photoUrl} alt={`${user.displayName} avatar`} />
                    </div>
                ) : (
                    <div className="user__name-wrapper">
                        <input className="user__name-input name-input" placeholder={user.displayName} ref={nameRef} />
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
            <Button className="user__logoutBtn" onClick={logout}>Logout</Button>
        </div>
    )
})