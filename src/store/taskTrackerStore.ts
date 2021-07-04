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
    tasks: ITasks,
    columns: IColumns,
    columnOrder: Array<string>,
    addTask: (content: string) => void,
    deleteTask: (task: IEntryTask) => void
    singleColumnMove: (column: IEntryColumn) => void,
    betweenColumnMove: (start: IEntryColumn, finish: IEntryColumn) => void
}

class TaskTracker implements IInitialState {
    tasks: ITasks = {}
    columns: IColumns = {}
    columnOrder: Array<string> = []

    constructor() {
        makeObservable(this, {
            tasks: observable,
            columns: observable,
            columnOrder: observable,
            addTask: action,
            deleteTask: action,
            singleColumnMove: action,
            betweenColumnMove: action
        })
    }

    addTask<T extends string>(content: T): void {
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

    deleteTask(task: IEntryTask): void {
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

    singleColumnMove(column: IEntryColumn): void {
        this.columns = {
            ...this.columns,
            [column.id]: column
        }

        db.collection('tasks').doc('taskData').update({ columns: this.columns })
    }

    betweenColumnMove<T extends IEntryColumn>(start: T, finish: T): void {
        this.columns = {
            ...this.columns,
            [start.id]: start,
            [finish.id]: finish
        }

        db.collection('tasks').doc('taskData').update({ columns: this.columns })
    }
}


export const taskStore = new TaskTracker()