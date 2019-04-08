import React from 'react';
import { FaRegCommentDots } from "react-icons/fa";

const NoteComment = ({comment}) => {
    return (
        <div className="taskNote">
            <FaRegCommentDots />
            <div className="taskNote__content">{comment}</div>
        </div>
    );
}

export default NoteComment;