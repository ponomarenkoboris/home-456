import React from 'react'

interface IState {
    hasError: boolean
}

// TODO add customize error boundary
export class ErrorBoundary extends React.Component<React.ReactNode, IState> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: any): IState {
        console.log('this is error => ', error)
        return { hasError: true }
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return <div>Что-то пошло не так. Попробуйте перезагрузить страницу или зайдите позже.</div>
        }
        return this.props.children
    }
}