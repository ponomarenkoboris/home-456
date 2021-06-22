import React, { useRef } from 'react'
import './styles/ChatBox.scss'
import db from '../../api/firebase'

export default function ChatBox() {
    const mainInputRef = useRef<HTMLInputElement>(null)

    const sendPost = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (mainInputRef && mainInputRef.current && mainInputRef.current.value.trim()) {
            db.collection('posts').add({
                displayName: localStorage.getItem('user_displayName') || 'undefined',
                email: localStorage.getItem('user_email') || 'undefined',
                avatar: localStorage.getItem('user_photoURL') || 'undefined',
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
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg" alt="User avatar" />
                    </div>
                    <input ref={mainInputRef} type="text" placeholder="Type text..." />
                </div>
                <button className="chatBox__sendMessageBtn">Send</button>
            </form>
        </div>
    )
}