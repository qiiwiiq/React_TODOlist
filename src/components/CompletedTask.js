import React from 'react';
import { FaRegSquare, FaRegCheckSquare, FaCheck, FaTimes, FaRegCalendarAlt, FaRegCommentDots, FaEllipsisH, FaTimesCircle, FaRegTrashAlt } from "react-icons/fa";
import NoteDeadline from './NoteDeadline';
import NoteComment from './NoteComment';

class CompletedTask extends React.Component {

    state = {
        unckecked: 'none',
        checked: 'block',
        showSimple: 'block',
        showDetail: 'none',
        delTaskNotice: 'none',
        trash_cursor: 'pointer'
    };

    // 檢視 Simple Task
    showDetailView = (e) => {
        // UI 
        this.setState({showSimple:'none'});
        this.setState({showDetail: 'block'});
    };

    // 檢視 Detail Task
    showSimpleView = (e) => {
        // UI 
        this.setState({showSimple:'block'});
        this.setState({showDetail: 'none'});
    };

    // 取消 complete task
    taskUncompleted = (e) => {
        // UI
        this.setState({
            unckecked: 'block',
            checked: 'none'
        });
    }

    taskCompleted = (e) => {
        // UI
        this.setState({
            unckecked: 'none',
            checked: 'block'
        });
    }

    // 刪除 Task
    confirmRemoveTask = (e) => {
        this.setState({
            delTaskNotice:'block',
            trash_cursor: 'default'
        });
    }

    removeTask = (e) => {
        let {id, deleteTask_completed} = this.props;

        // 隱藏 delete notice
        this.setState({
            delTaskNotice:'none',
            trash_cursor: 'pointer'
        });

        // 刪除 database task
        deleteTask_completed(id);
    };

    cancelRemoveTask = (e) => {
        // 隱藏 delete notice
        this.setState({
            delTaskNotice:'none',
            trash_cursor: 'pointer'
        });
    }

    // 顯示 Task 備註欄
    renderNoteDeadline = () => {
        let {deadline} = this.props.content;
        if(deadline !== ''){
            return <NoteDeadline deadline={deadline} />
        }
    };

    renderNoteComment = () => {
        let {note} = this.props.content;
        if(note !== ''){
            return <NoteComment comment={note} />
        }
    };

    render(){
        let unchecked = { display: this.state.unckecked };
        let checked = { display: this.state.checked };
        let showSimple = { display: this.state.showSimple };
        let showDetail = { display: this.state.showDetail };
        let delTaskNotice = { display: this.state.delTaskNotice };
        let trash_cursor = { cursor: this.state.trash_cursor };

        let {title, deadline, note, completeDate, issueDate} = this.props.content;

        return (
            <div className="completeItem">
                <div className="delNotice" style={delTaskNotice}>
                    <div className="delNotice__check">Delete?</div>
                    <ul className="delNotice__checkItem">
                        <li className="delNotice__checkItem--y" onClick={this.removeTask}><FaCheck /></li>
                        <li className="delNotice__checkItem--n" onClick={this.cancelRemoveTask}><FaTimes /></li>
                    </ul>
                </div>

                {/* 簡易Task */}
                <div className="completeSimple" style={showSimple}>
                    <div className="completeSimple__title">
                        <div className="completeSimple__title--checkbox--y" style={checked} onClick={this.taskUncompleted}><span><FaRegCheckSquare /></span></div>
                        <div className="completeSimple__title--checkbox--n" style={unchecked} onClick={this.taskCompleted}><span><FaRegSquare /></span></div>

                        <div className="completeSimple__title--text">{title}</div>
                        <div className="completeSimple__title--iconexpend" onClick={this.showDetailView}><FaEllipsisH /></div>
                        <div className="completeSimple__title--icontrash" style={trash_cursor} onClick={this.confirmRemoveTask}><FaRegTrashAlt /></div>
                    </div>
                    <div className="completeSimple__note">
                        {this.renderNoteDeadline()}
                        {this.renderNoteComment()}
                    </div>
                </div>

                {/* 詳細Task */}
                <div className="completeDetail" style={showDetail}>
                    <div className="completeDetail__title">
                        <div className="completeDetail__title--checkbox--y" style={checked} onClick={this.taskUncompleted}><span><FaRegCheckSquare /></span></div>
                        <div className="completeDetail__title--checkbox--n" style={unchecked} onClick={this.taskCompleted}><span><FaRegSquare /></span></div>
                    
                        <div className="completeDetail__title--text">{title}</div>
                        <div className="completeDetail__title--iconcollapse" onClick={this.showSimpleView}><FaTimesCircle /></div>
                        <div className="completeDetail__title--icontrash" style={trash_cursor} onClick={this.confirmRemoveTask}><FaRegTrashAlt /></div>
                    </div>

                    <div className="completeDetail__content">
                        <div className="completeDetail__content--deadline">
                            <FaRegCalendarAlt />
                            <div>Deadline</div>
                        </div>
                        <div className="completeDetail__content--input">
                            <div className="completeDetail__content--input--date">{deadline}</div>
                        </div>
                        <div className="completeDetail__content--comment">
                            <FaRegCommentDots />
                            <div>Comment</div>
                        </div>
                        <div className="completeDetail__content--inputcomment">{note}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompletedTask;