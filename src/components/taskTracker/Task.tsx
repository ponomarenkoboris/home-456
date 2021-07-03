import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import './styles/Task.scss'

interface ITask {
    task: {
        id: string,
        content: string
    },
    index: number,
}

export function Task({ task, index }: ITask) {

    return (
        <Draggable draggableId={task.id} index={index}>
            {provided => (
                <div 
                    className="task"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    {task.content}
                </div>
            )}
        </Draggable>
    )
}