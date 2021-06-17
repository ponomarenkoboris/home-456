import { action, makeObservable, observable, computed } from 'mobx'

interface UserStore {
    user: object | null,
    name: string,
    avatar: string,
    authenticationData: (props: object) => void,
    data: object | null,
    setName: (newName: string) => void,
    setAvatar: (newAvatarSrc: string) => void
}

class User implements UserStore {
    name = ''
    avatar = ''
    user: object | null  = {}

    constructor() {
        makeObservable(this, {
            user: observable,
            avatar: observable,
            name: observable,
            data: computed,
            authenticationData: action,
            setName: action,
            setAvatar: action
        })
    }

    authenticationData(newData: object) {
        this.user = newData
    }

    setName(value: string) {
        this.name = value
    }

    setAvatar(value: string) {
        this.avatar = value
    }

    get data () {
        return this.user
    }
}

export const user = new User()