import React, {ChangeEvent, FC, useRef, useState} from "react";
import {FaCircleArrowRight} from "react-icons/fa6";
import {FaCircle} from "react-icons/fa";
import {Priorities} from "./Task";
import getDeadlineFormatted from "../../utils/getDateFormatted";
import DatePicker from "react-datepicker";
import TaskModel from "../../models/Task.model";
import {ADD_TASK, TaskAction} from "../../redusers/taskReduser";

interface NewTaskProps {
    list_id: number,
    dispatch: React.Dispatch<TaskAction>
}

//const API = process.env.REACT_APP_API_URL;

const NewTask: FC<NewTaskProps> = ({dispatch, list_id}) => {
    const initialTaskState: TaskModel = {
        id: Math.floor(Math.random() * 1000),
        listId: list_id,
        title: "",
        completed: false,
        due_date: undefined,
        priority: 4,
    };

    const [task, setTask] = useState<TaskModel>(initialTaskState);

    const typeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTask({
            ...task,
            title: e.target.value,
        });
    };

    const openDatePicker = () => {
        if (datePickerRef.current) {
            (datePickerRef.current as any).setOpen(true);
        }
    };

    const datePickerRef = useRef(null);

    const [showPriorityMenu, setShowPriorityMenu] = useState<boolean>(false);

    const changePriority = (newPriority: number) => {
        setTask({
            ...task,
            priority: newPriority,
        });
        setShowPriorityMenu(false);
    };
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (task.title === "") return;

/*        try {
            const response = await fetch(`${API}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({
                    type: ADD_TASK,
                    payload: data,
                });
                setTask(initialTaskState);
            } else {
                console.error('Error in creating a new task');
            }
        } catch (e) {
            console.error(e);
        }*/

        dispatch({
            type: ADD_TASK,
            payload: task,
        });
    };

    return (
        <form className={"NewTask"} onSubmit={submitHandler}>
            <div>
                <input
                    type={"text"}
                    value={task.title}
                    onChange={typeHandler}
                    placeholder={"New task"}
                    maxLength={32}
                />
            </div>
            <div className={"task-actions"}>
                <div className={"date-picker-container"}>
                    <p onClick={openDatePicker}>
                        {getDeadlineFormatted(task.due_date)}
                    </p>
                    <DatePicker
                        ref={datePickerRef}
                        onChange={(date) =>
                            setTask({...task, due_date: date ? date : undefined})}
                        selected={task.due_date}
                        className={"date-picker"}
                    />
                </div>
                <div className="priority-selector">
                    <FaCircle
                        style={{color: Priorities[task.priority]}}
                        onClick={() => setShowPriorityMenu(!showPriorityMenu)}
                    />
                    {showPriorityMenu && (
                        <div className="priorities" style={{top: `-${(task.priority - 1) * 1.8 + 0.5}em`}}>
                            {[1, 2, 3, 4].map((priority) => (
                                <FaCircle
                                    key={priority}
                                    style={{color: Priorities[priority]}}
                                    onClick={() => changePriority(priority)}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <button type={"submit"}>
                    <FaCircleArrowRight/>
                </button>
            </div>
        </form>
    );
}

export default NewTask;
