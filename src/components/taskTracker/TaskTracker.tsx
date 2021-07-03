import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './styles/TaskTracker.scss'
import { Column } from './Column'
import { Button } from '@material-ui/core';
import db from '../../api/firebase'

// TODO optimization and drag&drop logic

export interface IInitialState {
    tasks: {
        [id: string]: { id: string, content: string }
    },
    columns: {
        [id: string]: { id: string, title: string, taskIds: Array<string> }
    },
    columnOrder: Array<string>
}

// TODO add styles

export function TaskTracker() {
    const [initialData, setInitialData] = useState<IInitialState>()

    useEffect(() => {
        db.collection('tasks')
            .doc('taskData')
            .onSnapshot(snap => {
                const taskState = snap.data()
                if (taskState?.tasks && taskState?.columns && taskState?.columnOrder) {
                    setInitialData({
                        tasks: taskState.tasks,
                        columns: taskState.columns,
                        columnOrder: taskState.columnOrder
                    })
                }
            })
    })

    const dragEnd = ({ destination, source, draggableId }: DropResult): void => {
        if (!destination || destination.droppableId === source.droppableId && destination.index === source.index || !initialData) return
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
        if (!initialData) return
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
                        {initialData?.columnOrder && initialData.columnOrder.map(columnId => {
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