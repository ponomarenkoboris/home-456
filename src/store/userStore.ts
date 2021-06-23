import { action, makeObservable, observable, computed } from 'mobx'

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
    data: { name: string, avatar: string, email: string },
    setName: (newName: string) => void,
    setAvatar: (newAvatarSrc: string) => void
}

class User implements UserStateType {
    name = ''
    avatar = ''
    email = ''

    constructor() {
        makeObservable(this, {
            email: observable,
            avatar: observable,
            name: observable,
            data: computed,
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

    setName(value: string) {
        this.name = value
    }

    setAvatar(value: string) {
        this.avatar = value
    }

    get data () {
        return { name: this.name, avatar: this.avatar, email: this.email }
    }
}

export const user = new User()