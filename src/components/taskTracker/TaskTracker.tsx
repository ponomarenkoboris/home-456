import React from 'react';
import { DnDContext } from './DnDContext';
import './styles/TaskTracker.scss'
import { Column } from './Column'
import { Button } from '@material-ui/core';
import db from '../../api/firebase'
import { observer } from 'mobx-react-lite'
import { taskStore } from '../../store/taskTrackerStore'

export const TaskTracker = observer(() => {

    if (taskStore.trackerColumnOrder.length === 0){
        db.collection('tasks')
            .doc('taskData')
            .onSnapshot(snap => {
                const data = snap.data()
                if (data?.tasks && data?.columns && data?.columnOrder) {
                    taskStore.trackerTasks = data.tasks
                    taskStore.trackerColumns = data.columns
                    taskStore.trackerColumnOrder = data.columnOrder
                }
            })
    }

    const createNewTask = (): void => {
        const taskContent: string | null = prompt('Enter task content...')
        if (typeof taskContent !== 'string' || !taskContent.trim()) return
        taskStore.addTask(taskContent)
    }

    return taskStore.trackerColumnOrder.length !== 0 ? (
        <div className="taskTracker__container">
            <Button className="container__header" onClick={createNewTask}>Create new Task</Button>
            <DnDContext>
                <div className="taskTracker">
                    <div className="taskTracker__body">
                        {taskStore?.trackerColumnOrder && taskStore.trackerColumnOrder.map(columnId => {
                            const column = taskStore.trackerColumns[columnId]
                            const tasks = column.taskIds.map(taskId => taskStore.trackerTasks[taskId])
                            return <Column key={column.id} column={column} tasks={tasks} />
                        })}
                    </div>
                </div>
            </DnDContext>
        </div>
    ) : (
        <h1>Wait...</h1>
    )
})