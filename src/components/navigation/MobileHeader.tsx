import {HiOutlineMenuAlt1} from "react-icons/hi";
import React, {FC} from "react";

type MobileHeaderProps = {
    setMenuToggle:  React.Dispatch<React.SetStateAction<boolean>>,
}

const MobileHeader: FC<MobileHeaderProps> = ({setMenuToggle}) => {
    return (
        <header className={"MobileHeader"}>
            <h1>To-Do List</h1>
            <HiOutlineMenuAlt1 onClick={() =>
                setMenuToggle(prevState => !prevState)}/>
        </header>
    );
}

export default MobileHeader;