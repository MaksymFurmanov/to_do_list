import TaskModel from "../models/Task.model";

const sortTasks = (tasks: Array<TaskModel>) =>
    tasks.length > 1
        ? tasks.sort((a, b) => {
            if (!(a instanceof Date) || !(b instanceof Date)) return 0;
            if (a.completed || b.completed) return 0;

            if (a.due_date && b.due_date) {
                const dateDiff = a.due_date.getTime() - b.due_date.getTime();
                if (dateDiff !== 0) return dateDiff;
            } else if (a.due_date) {
                return -1;
            } else if (b.due_date) {
                return 1;
            }

            return a.priority - b.priority;
        })
        : tasks


export default sortTasks;