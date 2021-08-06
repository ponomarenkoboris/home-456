import React, { useEffect, useState, useRef } from "react";
import { BottomBarChat } from './BottomBarChat'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Button } from '@material-ui/core'
import './styles/Bottombar.scss'
import db from '../../api/firebase'

export function BottomBar() {
    const chatsWrapperRef = useRef<HTMLDivElement>(null)
    const [rooms, setRooms] = useState<Array<any>>([])
    
    useEffect(() => {
        let isMounted = true
        db.collection('rooms')
            .onSnapshot(snap => isMounted && setRooms(snap.docs.map(doc => ({ id: doc.id, data: doc.data() }))))
        
        return () => { isMounted = false }
    })

    const displayChatsNames = (direction: string): void => {
        // TODO complete pagination
        if (chatsWrapperRef && chatsWrapperRef.current) {
            if (direction === 'previous') {
                chatsWrapperRef.current.style.transform = 'translateX(200px)'
            }
            if (direction === 'forward') {
                chatsWrapperRef.current.style.transform = 'translateX(-200px)'
            }
        }
    }

    return (
        <div className="bottombar">
            <Button onClick={() => displayChatsNames('previous')}>
                <ArrowBackIosIcon />
            </Button>
            <div className="bottombar__chatsWrapper" ref={chatsWrapperRef}>
                <BottomBarChat addNewChat />
                {rooms.map(room => (
                    <BottomBarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
            <Button onClick={() => displayChatsNames('forward')}>
                <ArrowForwardIosIcon />
            </Button>
        </div>
    )
}