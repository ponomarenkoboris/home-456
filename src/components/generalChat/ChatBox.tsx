import React, { useRef } from 'react'
import './styles/ChatBox.scss'
import { user } from '../../store/userStore'
import db from '../../api/firebase'

export default function ChatBox() {
    const mainInputRef = useRef<HTMLInputElement>(null)

    const sendPost = (e: React.SyntheticEvent): void => {
        e.preventDefault()
        if (mainInputRef && mainInputRef.current && mainInputRef.current.value.trim()) {
            db.collection('posts').add({
                displayName: user.displayName,
                email: user.userEmail,
                avatar: user.photoUrl,
                text: mainInputRef.current.value,
                timestamp: new Date()
            })
            mainInputRef.current.value = ''
        }
    }

    return (
        <div className="chatBox">
            <form onSubmit={sendPost}>
                <div className="chatBox__input">
                    <div className="chatBox__userAvatar">
                        <img src={user.photoUrl} alt={`${user.displayName} avatar`} />
                    </div>
                    <input ref={mainInputRef} type="text" placeholder="Type text..." />
                </div>
                <button className="chatBox__sendMessageBtn">Send</button>
            </form>
        </div>
    )
}