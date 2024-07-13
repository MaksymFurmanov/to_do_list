import React, {ChangeEvent, FC, useRef, useState} from "react";
import {FaCircle} from "react-icons/fa";
import TaskModel from "../../models/Task.model";
import {FaCircleCheck} from "react-icons/fa6";
import {RxCross2} from "react-icons/rx";
import useClickOutside from "../../hooks/useClickOutside";
import getDeadlineFormatted from "../../utils/getDateFormatted";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {
    REMOVE_TASK,
    TaskAction,
    TOGGLE_COMPLETED,
    UPDATE_DUE_DATE,
    UPDATE_PRIORITY,
    UPDATE_TITLE
} from "../../redusers/taskReduser";

//const API = process.env.REACT_APP_API_URL;

export const Priorities: Record<number, string> = {
    1: "#9D0A0A",
    2: "#B5D00F",
    3: "#21449E",
    4: "#4AAD9B"
}

interface TaskProps {
    task: TaskModel;
    dispatch: React.Dispatch<TaskAction>;
}

const Task: FC<TaskProps> = ({task, dispatch}) => {
    const {id, completed, due_date, priority} = task;

    const [title, setTitle] = useState<string>(task.title);
    const [titleEditing, setTitleEditing] = useState<boolean>(false);
    const titleRef = useRef<HTMLInputElement>(null);

    const datePickerRef = useRef(null);

    const [showPriorityMenu, setShowPriorityMenu] = useState<boolean>(false);

    const checkHandler = async () => {
        /*       try {
                   const response = await fetch(`${API}/tasks?id=${id}`, {
                       method: 'PUT',
                       headers: {
                           'Content-Type': 'application/json'
                       },
                       body: JSON.stringify({
                           completed: !completed
                       })
                   });

                   if (response.ok) {
                       dispatch({
                           type: TOGGLE_COMPLETED,
                           payload: {id}
                       });
                   }
               } catch (e) {
                   console.error(e);
               }*/
            dispatch({
                type: TOGGLE_COMPLETED,
                payload: {id}
            });
    };

    const editTitleHandler = async () => {
        setTitleEditing(!titleEditing);
        if (titleEditing) {
            if (title === "") setTitle("Undefined");

/*            try {
                const response = await fetch(`${API}/tasks?id=${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: title
                    })
                });

                if (response.ok) {
                    dispatch({
                        type: UPDATE_TITLE,
                        payload: {id, title}
                    });
                }
            } catch (e) {
                console.error(e);
            }*/
            dispatch({
                type: UPDATE_TITLE,
                payload: {id, title}
            });
        }
    };

    const typeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    useClickOutside({
        ref: titleRef,
        onClickOutside: editTitleHandler,
        active: titleEditing,
    });

    const openDatePicker = () => {
        if (datePickerRef.current) {
            (datePickerRef.current as any).setOpen(true);
        }
    };

    const changeDeadline = async (newDate: Date | null) => {
/*        try {
            const response = await fetch(`${API}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    due_date: newDate ? newDate.getTime() / 1000 : null
                })
            });

            if (response.ok) {
                dispatch({
                    type: UPDATE_DUE_DATE,
                    payload: {
                        id,
                        due_date: newDate ? newDate : undefined
                    }
                });
            }
        } catch (e) {
            console.error(e);
        }*/
        dispatch({
            type: UPDATE_DUE_DATE,
            payload: {
                id,
                due_date: newDate ? newDate : undefined
            }
        });
    };

    const changePriority = async (newPriority: number) => {
        setShowPriorityMenu(false);
        /*try {
            const response = await fetch(`${API}/tasks?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    priority: newPriority
                })
            });

            if (response.ok) {
                dispatch({
                    type: UPDATE_PRIORITY,
                    payload: {id, priority: newPriority}
                });
            }
        } catch (e) {
            console.error(e);
        }*/
        dispatch({
            type: UPDATE_PRIORITY,
            payload: {id, priority: newPriority}
        });
    };

    const deleteHandler = async () => {
/*        try {
            const response = await fetch(`${API}/tasks?id=${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                dispatch({
                    type: REMOVE_TASK,
                    payload: {id}
                });
            }
        } catch (e) {
            console.error(e);
        }*/

        dispatch({
            type: REMOVE_TASK,
            payload: {id}
        });
    };

    return (
        <div className={"Task"}>
            <div>
                {completed
                    ? <FaCircleCheck className={"checkbox completed"}
                                     onClick={checkHandler}/>
                    : <FaCircle className={"checkbox"}
                                onClick={checkHandler}/>
                }
                {titleEditing
                    ? <input type={"text"}
                             ref={titleRef}
                             value={title}
                             placeholder={"Untitled"}
                             onChange={typeHandler}
                             className={"editing"}
                             maxLength={32}
                    />
                    : <p className={completed ? "completed" : ""}
                         onClick={editTitleHandler}>
                        {title}
                    </p>
                }
            </div>
            <div className={"task-actions"}>
                <div className={"date-picker-container"}>
                    <p onClick={openDatePicker}>
                        {getDeadlineFormatted(due_date)}
                    </p>
                    <DatePicker ref={datePickerRef}
                                onChange={(date) =>
                                    changeDeadline(date)}
                                selected={due_date}
                                className={"date-picker"}
                    />
                </div>
                <div className="priority-selector">
                    <FaCircle style={{color: Priorities[priority]}}
                              onClick={() =>
                                  setShowPriorityMenu(!showPriorityMenu)}
                    />
                    {showPriorityMenu && (
                        <div className="priorities"
                             style={{top: `-${(priority - 1) * 1.8 + 0.5}em`}}>
                            {[1, 2, 3, 4].map((priority) => (
                                <FaCircle key={priority}
                                          style={{color: Priorities[priority]}}
                                          onClick={() => changePriority(priority)}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <RxCross2 onClick={deleteHandler}/>
            </div>
        </div>
    );
};

export default Task;