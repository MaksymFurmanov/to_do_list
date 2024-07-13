import React, {FC} from "react";
import {BsPlusCircleFill} from "react-icons/bs";
import ListModel from "../../models/List.model";

type NewListProps = {
    setLists: React.Dispatch<React.SetStateAction<ListModel[]>>,
    project_id: number
}

//const API = process.env.REACT_APP_API_URL;

const NewList: FC<NewListProps> = ({setLists, project_id}) => {
    const createList = async () => {
        const newList: ListModel = {
            id: Math.floor(Math.random() * 1000),
            projectId: project_id,
            title: "Untitled",
        }

/*        try {
            const response = await fetch(`${API}/lists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newList),
            });

            if (response.ok) {
                const data = await response.json();
                setLists(prevState => [...prevState, data]);
            } else {
                console.error('Error in creating a new lists');
            }
        } catch (e) {
            console.error(e);
        }*/

        setLists(prevState => [...prevState, newList]);
    }

    return (
        <div className={"NewList"}>
            <button onClick={createList}>
                <BsPlusCircleFill/>
            </button>
        </div>
    );
}

export default NewList;