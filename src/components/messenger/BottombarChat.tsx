import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import db from '../../api/firebase'

interface BottombarChatProps {
    addNewChat?: boolean,
    id?: string | undefined,
    name?: string
}

export function BottombarChat({ addNewChat, id, name }: BottombarChatProps) {
    const [seed, setSeed] = useState<number>()
    const [messages, setMessages] = useState<Array<any>>([])

    useEffect(() => {
        if (id) {
            db.collection('rooms')
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snap => setMessages(snap.docs.map(doc => doc.data())))
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    })

    const createChat = () => {
        const roomName: string | null = prompt('Please enter new name for chat room')
        if (typeof roomName === 'string' && roomName.trim().length > 0) db.collection('rooms').add({ name: roomName })
    }

    return !addNewChat ? (
        <Link to={`/messenger/${id}`}>
            <div className="buttonbarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="buttonbarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="buttonbarChat">
            <h2>Add new chat</h2>
        </div>
    )
}