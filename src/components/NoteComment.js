import React from 'react';
import { FaRegCommentDots } from "react-icons/fa";

// 控制顯示 comment 字串長度
const displayComment = (comment) => {
    if(comment.length > 18) {
        let shortenComment = comment.substring(0,18) + " ...";
        return shortenComment;
    } else {
        return comment;
    }
}

const NoteComment = ({comment}) => {
    return (
        <div className="taskNote">
            <div className="taskNote__icon"><FaRegCommentDots /></div>
            <div className="taskNote__content">{displayComment(comment)}</div>
        </div>
    );
}

export default NoteComment;