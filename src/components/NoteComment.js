import React from 'react';
import { FaRegCommentDots } from "react-icons/fa";

const NoteComment = ({comment}) => {
    return (
        <div>
            <FaRegCommentDots />
            <div>{comment}</div>
        </div>
    );
}

export default NoteComment;