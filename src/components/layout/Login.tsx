import React from 'react'
import './styles/Login.scss'
import logo from './assets/houseIcon.svg'
import { Button } from "@material-ui/core";
import { auth, provider } from '../../api/firebase'
import { user } from '../../store/userStore'

export function Login() {
    
    const signIn = (): void => {
        auth.signInWithPopup(provider)
            .then(result => {
                result.user && user.authenticationData(result.user)
            })
            .then(() => window.location.reload())
            .catch(err => alert(err))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src={logo} alt="Logo home app" />
                <div className="login__text">
                    <h1>Sign in App</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}