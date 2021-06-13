import React from 'react';
// import { Chat } from './Chat';
import './styles/Messenger.scss'
import { Route, Switch, useHistory } from 'react-router-dom'

export function Messenger() {
    const history = useHistory()

    return (
        <div className="messenger-container">
            <Switch>
                <Route path="/messenger/:roomId">
                    {/* <Chat /> */}
                </Route>
                <Route path="/messenger">
                    <button onClick={() => history.push('/messenger/5')}>Go to path</button>
                </Route>
            </Switch>
        </div>
    )
}
