import { action, makeObservable, observable } from 'mobx';

class User {
    name: string = 'Авторизоваться'
    avatar: string = ''

    constructor() {
        makeObservable(this, {
            name: observable,
            avatar: observable,
            changeName: action,
            changeAvatar: action
        })
    }

    changeName(value: string) {
        this.name = value
    }

    changeAvatar(src: string) {
        this.avatar = src
    }
}

export const user = new User()