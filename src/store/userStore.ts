import { action, makeObservable, observable, computed } from 'mobx'
import firebase from 'firebase'

export interface IUserStateType {
    displayName: string,
    photoUrl: string,
    userEmail: string,
    authenticationData: (props: firebase.User) => void,
    setName: (newName: string) => void,
    setAvatar: (newAvatarSrc: string) => void
}

class User implements IUserStateType {
    private name = localStorage.getItem('user_displayName') || ''
    private avatar = localStorage.getItem('user_photoURL') || ''
    private email = localStorage.getItem('user_email') || ''
    
    get displayName() { return this.name }
    get photoUrl() { return this.avatar }
    get userEmail() { return this.email }

    constructor() {
        makeObservable<User, 'email' | 'avatar' | 'name'>(this, {
            email: observable,
            avatar: observable,
            name: observable,
            displayName: computed,
            photoUrl: computed,
            userEmail: computed,
            authenticationData: action,
            setName: action,
            setAvatar: action,
        })
    }

    authenticationData({ displayName, photoURL, email }: firebase.User) {
        if (displayName && photoURL && email) {
            localStorage.setItem('user_displayName', displayName)
            localStorage.setItem('user_email', email)
            localStorage.setItem('user_photoURL', photoURL)
            this.name = displayName
            this.avatar = photoURL
            this.email = email
        }
    }

    setName(name: string) {
        localStorage.setItem('user_displayName', name)
        this.name = name
    }

    setAvatar(url: string) {
        localStorage.setItem('user_photoURL', url)
        this.avatar = url
    }
}

export const user = new User()