import React, {useEffect, useState} from 'react';
import './App.css';
import NavDrawer from "./components/navigation/NavDrawer";
import Project from "./components/projects/Project";
import ProjectModel from "./models/Project.model";
import MobileHeader from "./components/navigation/MobileHeader";

export const AllProjects: ProjectModel = {
    id: null,
    title: "All Projects"
}

function App() {
    const [selectedProject, setSelectedProject] = useState<ProjectModel>(AllProjects);

    const [menuToggle, setMenuToggle] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const selectProjectHandler = (project: ProjectModel): void => {
        setSelectedProject(project);
        if (menuToggle) setMenuToggle(false);
    }

    return (
        <>
            <div className={"App"}>
                {
                    isMobile
                        ? <MobileHeader setMenuToggle={() => setMenuToggle(!menuToggle)}/>
                        : <NavDrawer selectedProject={selectedProject}
                                     selectProject={selectProjectHandler}/>
                }
                <Project project={selectedProject}/>
            </div>
            {menuToggle &&
                (<>
                    <div className={"cover"}
                         onClick={() => setMenuToggle(false)}/>
                    <NavDrawer selectedProject={selectedProject}
                               selectProject={selectProjectHandler}/>
                </>)
            }
        </>
    );
}

export default App;
