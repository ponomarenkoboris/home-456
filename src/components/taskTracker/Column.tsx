import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Task } from './Task'
import './styles/Column.scss'

interface IColumnProps {
    column: {
        id: string,
        title: string,
        taskIds: Array<string>
    },
    tasks: { id: string, content: string }[]
}

export function Column({ column, tasks }: IColumnProps) {
    return (
        <div className="column">
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        className="column__body"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ backgroundColor: snapshot.isDraggingOver ? 'skyblue' : 'inherit' }}
                    >
                        <h3>{column.title}</h3>
                        {tasks.map((task: { id: string, content: string }, idx: number) => task?.id ? <Task key={task.id} task={task} index={idx} /> : '')}
                        {provided.placeholder}
                    </div> 
                )}
            </Droppable>
        </div>
    )
}  