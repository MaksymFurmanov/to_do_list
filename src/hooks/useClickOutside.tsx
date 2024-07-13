import React, {useEffect} from "react";

interface UseClickOutsideProps {
    ref: React.RefObject<HTMLElement>;
    onClickOutside: () => void;
    active: boolean;
}

const useClickOutside = ({ref, onClickOutside, active,}: UseClickOutsideProps) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (active && ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onClickOutside, active]);
};

export default useClickOutside;
