import React from 'react'
import './styles/Messenger.scss'
import { Route } from 'react-router-dom'
import { Chat } from './Chat'
import { BottomBar } from './BottomBar'

function Messenger() {

    return (
        <div className='messenger'>
            <div className="messenger__body">
                <Route path="/messenger/:roomId">
                    <Chat />
                </Route>
            </div>
            <div className="messenger__footer">
                <BottomBar />
            </div>
        </div>
    )
}

export default Messenger