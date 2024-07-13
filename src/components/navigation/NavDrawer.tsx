import React, {FC, useCallback, useEffect, useState} from "react";
import ProjectModel from "../../models/Project.model";
import projectsData from "../../initData/projects.data";
import {AllProjects} from "../../App";

interface NavDrawerProps {
    selectedProject: ProjectModel,
    selectProject: (project: ProjectModel) => void
}

const NavDrawer: FC<NavDrawerProps> = ({selectedProject, selectProject}) => {
    const [projects, setProjects] = useState<Array<ProjectModel>>([]);

    const fetchProjects = useCallback(() => {
        return projectsData;
    }, []);

    useEffect(() => {
        const projects = fetchProjects();
        setProjects(projects);
    }, [fetchProjects]);

    const projectsItems = projects.map((project) => {
        return <div key={project.id}
                    className={"nav-item"}>
            <div className={`${selectedProject.id === project.id &&
            "selected-project"}`}
                 onClick={() => selectProject(project)}>
                <p>{project.title}</p>
            </div>
        </div>
    });

    return (
        <div className={"NavDrawer"}>
            <h1>To-Do List</h1>
            <div key={-1}
                 className={`nav-item 
                    ${selectedProject.id === AllProjects.id && "selected-project"}`}
                 onClick={() => selectProject(AllProjects)}>
                <p>All projects</p>
            </div>
            {projectsItems}
            {/*<BsPlusCircleFill className={"new-project-button"}>/*/}
        </div>
    );
}

export default NavDrawer;