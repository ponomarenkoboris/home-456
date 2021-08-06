import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import './styles/BottombarChat.scss'
import db from '../../api/firebase'

interface IBottomBarChatProps {
    addNewChat?: boolean,
    id?: string,
    name?: string
}

export function BottomBarChat({ addNewChat, id, name }: IBottomBarChatProps) {
    const history = useHistory();

    const createChat = () => {
        const roomName: string | null = prompt('Введите название комнаты');
        if(roomName && roomName.trim()) db.collection('rooms').add({ name: roomName })
    }
    
    return !addNewChat ? (
        <Button onClick={() => history.push(`/messenger/${id}`)} className="bottombarChat">
            <p className="bottombarChat__roomName">{name}</p>
        </Button>
    ) : (
        <div className="bottombarChat__newChat">
            <Button className="newChat__button" onClick={createChat}>Start new chat</Button>
        </div>
    )
}