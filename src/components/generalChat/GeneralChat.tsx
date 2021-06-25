import React, { useState, useEffect } from 'react'
import Post from './Post'
import ChatBox from './ChatBox'
import './styles/GeneralChat.scss'
import db from '../../api/firebase'

// TODO Доделать дописать стили для GeneralChat

// interface IPosts {
//     avatar?: string,
//     image?: string,
//     timestamp: string,
//     displayName: string,
//     text: string,
//     email: string
// }

export function GeneralChat() {
    const [posts, setPosts] = useState<Array<any>>([])

    useEffect(() => {
        db.collection("posts")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) =>
                setPosts(snapshot.docs.map(doc => doc.data()))
            );
    }, [])

    return (
        <div className="generalChat">
            <div className="generalChat__header">
                <ChatBox />
            </div>
            <div className="generalChat__posts">
                {posts.length ? posts.map(post => (
                    <Post 
                        key={post.timestamp.seconds}
                        avatar={post.avatar}
                        timestamp={new Date(post.timestamp.toDate()).toLocaleTimeString()}
                        displayName={post.displayName}
                        email={post.email}
                        text={post.text}
                        image={post.image}
                    />
                )) : <h1>No messages yet</h1>}
            </div>
        </div>
    )
}