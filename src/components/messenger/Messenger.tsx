import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Chat } from './Chat'

export function Messenger() {
    return (
        <div className='app'>
            <div className='app_body'>
                <Switch>
                    <Route path="/messenger/:roomID">
                        <Chat />
                    </Route>
                    <Route>
                        <h1>hot room id</h1>
                    </Route>
                </Switch>  
            </div>
        </div>
    )
}