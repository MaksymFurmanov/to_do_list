import React, {ChangeEvent, FC, useCallback, useEffect, useReducer, useRef, useState} from "react";
import Task from "../tasks/Task";
import ListModel from "../../models/List.model";
import useClickOutside from "../../hooks/useClickOutside";
import NewTask from "../tasks/NewTask";
import taskReducer, {LOAD_TASKS} from "../../redusers/taskReduser";
import {IoMdTrash} from "react-icons/io";
import TaskModel from "../../models/Task.model";
import {FaPen} from "react-icons/fa6";

interface ListProps {
    list: ListModel,
    setLists: React.Dispatch<React.SetStateAction<ListModel[]>>
}

const API = process.env.REACT_APP_API_URL;

interface FetchedTask {
    id: number,
    listId: number,
    title: string,
    completed: boolean,
    due_date: string,
    priority: number
}

const List: FC<ListProps> = ({list, setLists}) => {
    const {id} = list;

    const [title, setTitle] = useState<string>(list.title);
    const [showPen, setShowPen] = useState<boolean>(false);
    const [titleEditing, setTitleEditing] = useState<boolean>(false);
    const titleRef = useRef<HTMLInputElement>(null);

    const [tasks, dispatch] = useReducer(taskReducer, []);

    const fetchTasks = useCallback(async () => {
        const projectRoute = id === null ? "tasks" : `tasks?listId=${id}`;
        try {
            const response = await fetch(`${API}/${projectRoute}`);
            if (response.ok) {
                const data = await response.json();
                const normalizedTasks: TaskModel[] = data.map((task: FetchedTask) => ({
                    ...task,
                    due_date: task.due_date ? new Date(task.due_date) : undefined,
                }));

                dispatch({
                    type: LOAD_TASKS,
                    payload: normalizedTasks.filter((task: TaskModel) =>
                        task.listId === id
                    )
                });
            } else {
                console.error('Error in fetching tasks', response.statusText);
            }
        } catch (e) {
            console.error(e);
        }
    }, [id]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const tasksItems = tasks.map((task) => {
        return <Task key={task.id}
                     task={task}
                     dispatch={dispatch}
        />
    });

    const editTitleHandler = () => {
        setTitleEditing(prevState => !prevState);
        /*        if (titleEditing) {
                    if (title === "") setTitle("Undefined");

                    fetch(`${API}/lists?id=${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ...list,
                            title: title
                        })
                    }).then(res => {
                        if (res.ok) {
                            setLists(prevState =>
                                prevState.map(list => list.id === id
                                    ? {...list, title: title}
                                    : list
                                )
                            );
                        }
                    }).catch(e => {
                        console.error(e);
                    });
                }*/

        setLists(prevState =>
            prevState.map(list => list.id === id
                ? {...list, title: title}
                : list
            )
        );
    }


    const typeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    useClickOutside({
        ref: titleRef,
        onClickOutside: editTitleHandler,
        active: titleEditing,
    });

    const deleteHandler = () => {
        /*        fetch(`${API}/lists/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => {
                        if (res.ok) {
                            setLists(prevState =>
                                [...prevState.filter(list => list.id !== id)]);
                        }
                    })
                    .catch(e => {
                        console.error(e);
                    });*/
        setLists(prevState =>
            [...prevState.filter(list => list.id !== id)]);
    }

    return (
        <div className={"List"}>
            <div className={"list-settings"}>
                <div>
                    {titleEditing
                        ? <input type={"text"}
                                 ref={titleRef}
                                 value={title}
                                 placeholder={"Untitled"}
                                 onChange={typeHandler}
                                 className={"editing"}
                                 maxLength={32}
                        />
                        : <h3 onMouseEnter={() => setShowPen(true)}
                              onMouseLeave={() => setShowPen(false)}
                              onClick={editTitleHandler}>
                            {title}
                        </h3>
                    }
                    {showPen && <FaPen/>}
                </div>
                <IoMdTrash onClick={deleteHandler}/>
            </div>
            <NewTask dispatch={dispatch}
                     list_id={id}
            />
            {tasksItems}
        </div>
    );
}

export default List;