import { action, makeObservable, observable } from 'mobx'

interface AuthDataPropsType {
    displayName: string,
    photoURL: string,
    email: string
}

interface UserStateType {
    name: string,
    avatar: string,
    email: string,
    authenticationData: (props: AuthDataPropsType) => void,
    setName: (newName: string) => void,
    setAvatar: (newAvatarSrc: string) => void
}

class User implements UserStateType {
    name = localStorage.getItem('user_displayName') || ''
    avatar = localStorage.getItem('user_photoURL') || ''
    email = localStorage.getItem('user_email') || ''

    constructor() {
        makeObservable(this, {
            email: observable,
            avatar: observable,
            name: observable,
            authenticationData: action,
            setName: action,
            setAvatar: action
        })
    }

    authenticationData({ displayName, photoURL, email }: any) { //TODO change type
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