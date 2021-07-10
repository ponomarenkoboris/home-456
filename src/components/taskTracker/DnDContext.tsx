import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { taskStore } from '../../store/taskTrackerStore'

export function DnDContext({ children }: { children: React.ReactChild }) {
    const dragEnd = ({ destination, source, draggableId }: DropResult): void => {
        if (!destination || destination.droppableId === source.droppableId && destination.index === source.index) return
        const start = taskStore.trackerColumns[source.droppableId]
        const finish = taskStore.trackerColumns[destination.droppableId]

        if (start == finish) {
            const newTaskIds = [...start.taskIds]
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)
            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }
            taskStore.singleColumnMove(newColumn)
            return;
        }

        const startTaskIds = [...start.taskIds]
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishTaskIds = [...finish.taskIds]
        finishTaskIds.splice(destination.index, 0, draggableId)

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }
        taskStore.betweenColumnMove(newStart, newFinish)

    }
    return (
        <DragDropContext
            onDragEnd={dragEnd}
        >
            {children}
        </DragDropContext>
    )
}