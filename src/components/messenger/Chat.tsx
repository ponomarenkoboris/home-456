import React, {useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import db from '../../api/firebase'
import firebase from 'firebase'

// TODO user
// import { user } from 'useAuthContext'

export function Chat() {
    const message = useRef<HTMLInputElement>(null)
    const { roomId } = useParams<any>()
    const [roomName, setRoomName] = useState<string>('')
    const [messeges, setMesseges] = useState<Array<any>>([])

    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot(snap => setRoomName(snap.data()?.name))

            db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snap => setMesseges(snap.docs.map(doc => doc.data())))
        }
    }, [roomId])

    const sendMessege = (e: React.SyntheticEvent) => {
        e.preventDefault()

        if (message && message.current) {
            db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .add({
                    message: message?.current.value,
                    // name: user.displayName,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
        }
    }

    return roomId ? (
        <div className="chat">
            <div className="chat__header">
                {/* <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} /> */}
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at {}</p>
                    <div className="chat__headerRight">
                        {/* <IconButton>
                            <SearchOutlined />
                        </IconButton>
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                        <IconButton>
                            <MoreVert />
                        </IconButton> */}
                    </div>
                </div>
            </div>
            <div className="chat__body">
                {messeges.map(message => (
                    <p key={message.timestamp}></p>
                ))}
            </div>
            <div className="chat_footer">
                {/* <IconButton>
                    <InsertEmoticon />
                </IconButton> */}
                <form>
                    <input type="text" ref={message} placeholder="Type a messege..." />
                    <button onClick={sendMessege} type="submit">Send messege</button>
                </form>
                {/* <IconButton>
                    <Mic />
                </IconButton> */}
            </div>
        </div>
    ) : (
        <h1>Messenger</h1>
    )
}