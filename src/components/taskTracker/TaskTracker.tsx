import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './styles/TaskTracker.scss'
import { Column } from './Column'
import { Button } from '@material-ui/core';
import db from '../../api/firebase'
import { observer } from 'mobx-react-lite'
import { taskStore } from '../../store/taskTrackerStore'

/* 
    TODO <FIX> [MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: TaskTracker@2.columns
    Add styles
    Delete name field from creating new task
*/

export const TaskTracker = observer(() => {

    if (taskStore.columnOrder.length === 0){
        db.collection('tasks')
            .doc('taskData')
            .onSnapshot(snap => {
                const data = snap.data()
                if (data?.tasks && data?.columns && data?.columnOrder) {
                    taskStore.tasks = data.tasks
                    taskStore.columns = data.columns
                    taskStore.columnOrder = data.columnOrder
                }
            })
    }
    

    const dragEnd = ({ destination, source, draggableId }: DropResult): void => {
        if (!destination || destination.droppableId === source.droppableId && destination.index === source.index) return
        const start = taskStore.columns[source.droppableId]
        const finish = taskStore.columns[destination.droppableId]

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

    const createNewTask = (): void => {
        const taskContent: string | null = prompt('Enter task content...')
        if (typeof taskContent !== 'string' || !taskContent.trim()) return
        taskStore.addTask(taskContent)
    }

    return taskStore.columnOrder.length !== 0 ? (
        <div className="taskTracker__container">
            <Button className="container__header" onClick={createNewTask}>Create new Task</Button>
            <DragDropContext
                onDragEnd={dragEnd}
            >
                <div className="taskTracker">
                    <div className="taskTracker__body">
                        {taskStore?.columnOrder && taskStore.columnOrder.map(columnId => {
                            const column = taskStore.columns[columnId]
                            const tasks = column.taskIds.map(taskId => taskStore.tasks[taskId])
                            return <Column key={column.id} column={column} tasks={tasks} />
                        })}
                    </div>
                </div>
            </DragDropContext>
        </div>
    ) : (
        <h1>Wait...</h1>
    )
})