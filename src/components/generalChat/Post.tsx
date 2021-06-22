import React from 'react'
import './styles/Post.scss'

interface PostPropsType {
    avatar?: string,
    image?: string
    timestamp: string,
    displayName: string, 
    text: string,
    email: string
}

export default function Post({ avatar, displayName, timestamp, email, text, image }: PostPropsType) {
    return (
        <div className="post">
            <div className="post__avatar">
                {avatar && <img src={avatar} alt="User avatar" />}
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3>
                            {displayName} 
                            {" "}
                            <span className="post__userEmail">{email}</span>
                            {" "}
                            <span className="post__headerSpecial">
                                {timestamp}
                            </span>
                            
                        </h3>
                    </div>
                    <div className="post__headerDescription">
                        <p>{text}</p>
                    </div>
                </div>
                <div className="post__avatarWrapper">
                    {/* <img src="https://wpguynews.com/wp-content/uploads/2021/05/Smiling-Leo-Perfect-GIF.gifkeepProtocol.gif" alt="post photo" /> */}
                    {image && <img src={image} alt="" />}
                </div>
            </div>
        </div>
    )
}