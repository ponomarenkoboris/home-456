import React, { useState, useEffect } from 'react'
import { BottombarChat } from './BottombarChat'
import { IconButton } from '@material-ui/core' // import Avatar
import { DonutLarge, Chat, MoreVert, SearchOutlined } from '@material-ui/icons';
import db from '../../api/firebase'

export function Bottombar() {
    const [rooms, setRooms] = useState<Array<any>>([])
    // TODO auth context
    // const [{ user }] = useAuthContext()

    useEffect(() => {
        db.collection('rooms')
            .onSnapshot(snap => 
                setRooms(snap.docs.map(doc => ({ id: doc.id, data: doc.data() })))
            )
    })

    return (
        <div className="bottombar">
            <div className="bottombar__header">
                {/* <Avatar src={user?.photoURL} /> */}
                <div className="bottombar__headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="bottombar__search">
                <SearchOutlined />
                <input type="button" placeholder="Seacrh or start new chat" />                
            </div>
            <div className="bottombar__chat">
                <BottombarChat addNewChat={true} />
                {rooms.map(room => (
                    <BottombarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}