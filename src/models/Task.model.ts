type TaskModel = {
    id: number,
    listId: number,
    title: string,
    completed: boolean,
    due_date: Date | undefined,
    priority: number,
}

export default TaskModel;