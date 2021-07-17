import React, { useState, useRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { taskStore } from '../../store/taskTrackerStore'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import './styles/Task.scss'

interface ITask {
    task: {
        id: string,
        content: string
    },
    index: number,
}
// TODO add remove task logic
/*
     TODO <FIX> findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node
*/
export function Task({ task, index }: ITask) {
    const reference = useRef(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { setAnchorEl(e.currentTarget) };

    const closeToggle = () => setAnchorEl(null)

    const renameHandler = () => {
        const newName = prompt('Enter new name...')
        if (newName?.trim()) taskStore.renameTask(task.id, newName)
        setAnchorEl(null)
    };

    const deleteHandler = () => {
        taskStore.deleteTask(task)
        setAnchorEl(null)
    }

    return (
        <Draggable draggableId={task.id} index={index}>
            {provided => (
                <div 
                    className="task"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div ref={reference} className="task__actionsPopup">
                        <Button aria-controls="toggle-menu" aria-haspopup="true" onClick={handleClick}>
                            <MoreVertIcon />
                        </Button>
                        <Menu
                            id="toggle-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={!!anchorEl}
                            onClose={closeToggle}
                        >
                            <MenuItem onClick={renameHandler}>Rename</MenuItem>
                            <MenuItem onClick={deleteHandler}>Delete</MenuItem>
                        </Menu>
                    </div>
                    <p>{task.content}</p>
                </div>
            )}
        </Draggable>
    )
}