import TaskModel from "../models/Task.model";
import sortTasks from "../utils/sortTasks";

export const LOAD_TASKS = 'LOAD_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const TOGGLE_COMPLETED = 'TOGGLE_COMPLETED';
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_DUE_DATE = 'UPDATE_DUE_DATE';
export const UPDATE_PRIORITY = 'UPDATE_PRIORITY';

interface LoadTasksAction {
    type: typeof LOAD_TASKS,
    payload: Array<TaskModel>
}

interface AddTaskAction {
    type: typeof ADD_TASK,
    payload: TaskModel
}

interface RemoveTaskAction {
    type: typeof REMOVE_TASK,
    payload: { id: number }
}

interface ToggleCompletedAction {
    type: typeof TOGGLE_COMPLETED
    payload: { id: number }
}

interface UpdateTitleAction {
    type: typeof UPDATE_TITLE;
    payload: {
        id: number,
        title: string
    };
}

interface UpdateDueDateAction {
    type: typeof UPDATE_DUE_DATE,
    payload: {
        id: number,
        due_date: Date | undefined
    };
}

interface UpdatePriorityAction {
    type: typeof UPDATE_PRIORITY,
    payload: {
        id: number,
        priority: number
    };
}

export type TaskAction =
    | LoadTasksAction
    | AddTaskAction
    | RemoveTaskAction
    | ToggleCompletedAction
    | UpdateTitleAction
    | UpdateDueDateAction
    | UpdatePriorityAction;

const taskReducer = (state: Array<TaskModel>, action: TaskAction): TaskModel[] => {
    switch (action.type) {
        case LOAD_TASKS:
            return sortTasks([...action.payload]);
        case ADD_TASK:
            return sortTasks([...state, action.payload]);
        case TOGGLE_COMPLETED:
            const task = state.find(task => task.id === action.payload.id);
            if (!task) return state;
            const changedTask = {...task, completed: !task.completed};
            const tasks = state.filter(task => task.id !== action.payload.id);
            return changedTask.completed
                ? [...tasks, changedTask]
                : sortTasks([...tasks, changedTask])
        case UPDATE_TITLE:
            return state.map(task =>
                task.id === action.payload.id
                    ? {...task, title: action.payload.title}
                    : task
            );
        case UPDATE_DUE_DATE:
            return sortTasks(state.map(task =>
                task.id === action.payload.id
                    ? {...task, due_date: action.payload.due_date}
                    : task
            ));
        case UPDATE_PRIORITY:
            return sortTasks(state.map(task =>
                task.id === action.payload.id
                    ? {...task, priority: action.payload.priority}
                    : task
            ));
        case REMOVE_TASK:
            return state.filter(task => task.id !== action.payload.id);
        default:
            return state;
    }
};

export default taskReducer;