import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './styles/TaskTracker.scss'
import { Column } from './Column'
import { Button } from '@material-ui/core';
import taskState, { IInitialState } from '../../store/initial-data'

// Whatch types: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/types.md
// TODO add styles

export function TaskTracker() {
    const [initialData, setInitialData] = useState<IInitialState>(taskState)

    const dragEnd = ({ destination, source, draggableId }: DropResult): void => {
        if (!destination || destination.droppableId === source.droppableId && destination.index === source.index) return
        const start = initialData.columns[source.droppableId]
        const finish = initialData.columns[destination.droppableId]

        if (start == finish) {
            const newTaskIds = [...start.taskIds]
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)
            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }
            setInitialData({
                ...initialData,
                columns: {
                    ...initialData.columns,
                    [newColumn.id]: newColumn
                }
            })
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

        setInitialData({
            ...initialData,
            columns: {
                ...initialData.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        })
    }

    const createNewTask = (): void => {
        const taskName: string | null = prompt('Enter task name...')
        if (typeof taskName !== 'string' || !taskName.trim()) return
        const taskContent: string | null = prompt('Enter task content...')
        if (typeof taskContent !== 'string' || !taskContent.trim()) return
        const newTaskIds = [...initialData.columns['column-1'].taskIds]
        newTaskIds.push(taskName)

        setInitialData({
            ...initialData,
            tasks: {
                ...initialData.tasks,
                [taskName]: { id: taskName, content: taskContent }
            },
            columns: {
                ...initialData.columns,
                ['column-1']: {
                    ...initialData.columns['column-1'],
                    taskIds: newTaskIds
                }
            }
        })
    }

    return (
        <div className="taskTracker__container">
            <Button className="container__header" onClick={createNewTask}>Create new Task</Button>
            <DragDropContext
                onDragEnd={dragEnd}
            >
                <div className="taskTracker">
                    <div className="taskTracker__body">
                        {initialData.columnOrder.map(columnId => {
                            const column = initialData.columns[columnId]
                            const tasks = column.taskIds.map(taskId => initialData.tasks[taskId])
                            return <Column key={column.id} column={column} tasks={tasks} />
                        })}
                    </div>
                </div>
            </DragDropContext>
        </div>
    )
}