import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { user } from '../../store/userStore'
import db from '../../api/firebase'
import './styles/Chat.scss'

// TODO styles 

export function Chat() {
    const message = useRef<HTMLInputElement>(null)
    const { roomId } = useParams<{ roomId: string }>()
    const [roomName, setRoomName] = useState<string>('')
    const [messeges, setMesseges] = useState<Array<any>>([])

    useEffect(() => {
        let isMounted = true
        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot(snap => isMounted && setRoomName(snap.data()?.name))

            db.collection('rooms')
                .doc(roomId)
                .collection('messeges')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snap => isMounted && setMesseges(snap.docs.map(doc => doc.data())))
        }
        return () => { isMounted = false }
    }, [roomId])

    const sendMessage = (e: React.SyntheticEvent): void => {
        e.preventDefault()
        if (message && message.current && message.current.value.trim()){
            console.log('condition')
            db.collection('rooms')
                .doc(roomId)
                .collection('messeges')
                .add({
                    message: message.current.value,
                    name: user.displayName,
                    timestamp: new Date()
                })
            message.current.value = ''
        }
    }

    return (
        <div className="chat">
            <form className="chat__header" onSubmit={sendMessage}>
                <input ref={message} type="text" placeholder={`Type something to ${roomName}...`} />
                <button type="submit">Send</button>
            </form>
            <div className="chat__body">
                {messeges.map(item => (
                    <p key={item.timestamp} className={`chat__message ${item.name === user.displayName && 'chat__reciever'}`}>
                        <span className="chat__name">{item.name}</span>
                        
                        <span className="chat__timestamp">{new Date(item.timestamp?.toDate()).toLocaleDateString()}</span>
                        <br />
                        {item.message}
                    </p>
                ))}
            </div>
        </div>
    )
}