import React, {FC, useCallback, useEffect, useState} from "react";
import ProjectModel from "../../models/Project.model";
import ListModel from "../../models/List.model";
import List from "../lists/List";
import NewList from "../lists/NewList";

const API = process.env.REACT_APP_API_URL;

interface ProjectProps {
    project: ProjectModel,
}

const Project: FC<ProjectProps> = ({project}) => {
    const {id, title} = project;

    const [lists, setLists] = useState<Array<ListModel>>([]);

    const fetchLists = useCallback(async () => {
        try {
            const response = await fetch(`${API}/lists`);
            if (response.ok) {
                const data = await response.json();
                const fetchedLists = id === null
                    ? data
                    : data.filter((list: ListModel) => list.projectId === id);
                setLists(fetchedLists);
            }
        } catch (e) {
            console.error(e);
        }
    }, [id]);

    useEffect(() => {
        fetchLists();
    }, [fetchLists]);

    const listsItems = lists.map((list) => {
        return <List key={list.id}
                     setLists={setLists}
                     list={list}/>
    });

    return (
        <div className={"Project"}>
            <h2>
                {title}
            </h2>
            <div className={"lists"}>
                {listsItems}
                {id !== null && <NewList setLists={setLists}
                                         project_id={id}
                />}
            </div>
        </div>
    );
}

export default Project;