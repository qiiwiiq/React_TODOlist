import React from 'react';
import { FaRegCalendarAlt } from "react-icons/fa";

const NoteDeadline = ({deadline}) => {
    return (
        <div>
            <FaRegCalendarAlt />
            <div>{deadline}</div>
        </div>
    );
}

export default NoteDeadline;