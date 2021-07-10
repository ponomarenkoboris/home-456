import { makeObservable, observable, action } from "mobx";
import { nanoid } from "nanoid";
import db from '../api/firebase'

/*
    TODO <FIX> [MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: TaskTracker@2.columns
    Add styles
*/

interface IEntryColumn {
    id: string,
    title: string,
    taskIds: Array<string>
}

interface IEntryTask {
    id: string,
    content: string
}

interface IColumns {
    [id: string]: IEntryColumn
}

interface ITasks {
    [id: string]: IEntryTask
}

export interface IInitialState {
    addTask: (content: string) => any,
    deleteTask: (task: IEntryTask) => void
    singleColumnMove: (column: IEntryColumn) => void,
    betweenColumnMove: (start: IEntryColumn, finish: IEntryColumn) => void
}

class TaskTracker implements IInitialState {
    private tasks: ITasks = {}
    private columns: IColumns = {}
    private columnOrder: Array<string> = []

    get trackerTasks() { return this.tasks }
    set trackerTasks(tasks: ITasks) { this.tasks = tasks }

    get trackerColumns() { return this.columns }
    set trackerColumns(columns: IColumns) { this.columns = columns }

    get trackerColumnOrder() { return this.columnOrder }
    set trackerColumnOrder(columnOrder: Array<string>) { this.columnOrder = columnOrder }

    constructor() {
        makeObservable<TaskTracker, 'tasks' | 'columns' | 'columnOrder'>(this, {
            tasks: observable,
            columns: observable,
            columnOrder: observable,
            addTask: action,
            deleteTask: action,
            singleColumnMove: action,
            betweenColumnMove: action
        })
    }

    addTask<T extends string>(content: T) {
        const uniqId = nanoid(10)
        this.trackerTasks = {
            ...this.trackerTasks,
            [uniqId]: { id: uniqId, content }
        }
        this.trackerColumns = {
            ...this.trackerColumns,
            ['column-1']: {
                ...this.trackerColumns['column-1'],
                taskIds: [...this.trackerColumns['column-1'].taskIds, uniqId]
            }
        }

        db.collection('tasks').doc('taskData').update({ tasks: this.trackerTasks, columns: this.trackerColumns })
    }

    deleteTask(task: IEntryTask) {
        delete this.trackerTasks[task.id]
        for (const key of Object.keys(this.trackerColumns)) {
            if (this.trackerColumns[key].taskIds.find(taskId => taskId === task.id)) {
                this.trackerColumns = {
                    ...this.trackerColumns,
                    [key]: {
                        ...this.trackerColumns[key],
                        taskIds: this.trackerColumns[key].taskIds.filter(taskId => taskId !== task.id)
                    }
                }
            }
        }

        db.collection('tasks').doc('taskData').update({
            tasks: this.trackerTasks,
            columns: this.trackerColumns
        })
    }

    singleColumnMove(column: IEntryColumn) {
        this.trackerColumns = {
            ...this.trackerColumns,
            [column.id]: column
        }

        db.collection('tasks').doc('taskData').update({ columns: this.trackerColumns })
    }

    betweenColumnMove<T extends IEntryColumn>(start: T, finish: T) {
        this.trackerColumns = {
            ...this.trackerColumns,
            [start.id]: start,
            [finish.id]: finish
        }

        db.collection('tasks').doc('taskData').update({ columns: this.trackerColumns })
    }
}


export const taskStore = new TaskTracker()