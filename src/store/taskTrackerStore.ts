import { makeObservable, observable, action } from "mobx";
import { nanoid } from "nanoid";
import db from '../api/firebase'

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
    betweenColumnMove: (start: IEntryColumn, finish: IEntryColumn) => void,
    setTaskValues: (tasks: ITasks, columns: IColumns, columnOrder: Array<string>) => void,
    renameTask: (taskId: string, newName: string) => void
}

class TaskTracker implements IInitialState {
    private tasks: ITasks = {}
    private columns: IColumns = {}
    private columnOrder: Array<string> = []

    get trackerTasks() { return this.tasks }
    get trackerColumns() { return this.columns }
    get trackerColumnOrder() { return this.columnOrder }

    constructor() {
        makeObservable<TaskTracker, 'tasks' | 'columns' | 'columnOrder'>(this, {
            tasks: observable,
            columns: observable,
            columnOrder: observable,
            addTask: action,
            deleteTask: action,
            singleColumnMove: action,
            betweenColumnMove: action,
            setTaskValues: action,
            renameTask: action
        })
    }

    setTaskValues(newTasks: ITasks, newColumns: IColumns, newColumnOrder: Array<string>) {
        this.tasks = newTasks
        this.columns = newColumns
        this.columnOrder = newColumnOrder
    }

    renameTask(id: string, newName: string) {
        this.tasks = {
            ...this.tasks,
            [id]: {
                ...this.tasks[id],
                content: newName
            }
        }
        db.collection('tasks').doc('taskData').update({ tasks: this.tasks })
    }

    addTask<T extends string>(content: T) {
        const uniqId = nanoid(10)
        this.tasks = {
            ...this.tasks,
            [uniqId]: { id: uniqId, content }
        }
        this.columns = {
            ...this.columns,
            ['column-1']: {
                ...this.columns['column-1'],
                taskIds: [...this.columns['column-1'].taskIds, uniqId]
            }
        }
        db.collection('tasks').doc('taskData').update({ tasks: this.tasks, columns: this.columns })
    }

    deleteTask(task: IEntryTask) {
        delete this.tasks[task.id]
        for (const key of Object.keys(this.columns)) {
            if (this.columns[key].taskIds.find(taskId => taskId === task.id)) {
                this.columns = {
                    ...this.columns,
                    [key]: {
                        ...this.columns[key],
                        taskIds: this.columns[key].taskIds.filter(taskId => taskId !== task.id)
                    }
                }
            }
        }
        db.collection('tasks').doc('taskData').update({
            tasks: this.tasks,
            columns: this.columns
        })
    }

    singleColumnMove(column: IEntryColumn) {
        this.columns = {
            ...this.columns,
            [column.id]: column
        }

        db.collection('tasks').doc('taskData').update({ columns: this.columns })
    }

    async betweenColumnMove<T extends IEntryColumn>(start: T, finish: T) {
        this.columns = {
            ...this.columns,
            [start.id]: start,
            [finish.id]: finish
        }

        db.collection('tasks').doc('taskData').update({ columns: this.columns })
    }
}


export const taskStore = new TaskTracker()