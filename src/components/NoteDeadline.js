import React from 'react';
import { FaRegCalendarAlt } from "react-icons/fa";

const NoteDeadline = ({deadline}) => {
    return (
        <div className="taskNote">
            <FaRegCalendarAlt />
            <div className="taskNote__content">{deadline}</div>
        </div>
    );
}

export default NoteDeadline;