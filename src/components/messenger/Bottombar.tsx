import React, { useEffect, useState } from "react";
import { BottombarChat } from './BottombarChat'
import './styles/Bottombar.scss'
import db from '../../api/firebase'

// TODO pugination

export function Bottombar() {
    const [rooms, setRooms] = useState<Array<any>>([])
    
    useEffect(() => {
        db.collection('rooms')
            .onSnapshot(snap => setRooms(snap.docs.map(doc => ({ id: doc.id, data: doc.data() }))))
    })

    return (
        <div className="bottombar">
            <BottombarChat addNewChat />
            {rooms.map(room => (
                <BottombarChat key={room.id} id={room.id} name={room.data.name} />
            ))}
        </div>
    )
}