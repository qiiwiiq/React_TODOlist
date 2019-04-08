import React from 'react';
import { FaRegCalendarAlt, FaRegCommentDots, FaEllipsisH, FaTrashAlt } from "react-icons/fa";
import NoteDeadline from './NoteDeadline';
import NoteComment from './NoteComment';

class CompletedTask extends React.Component {

    state = {
        showSimple: 'block',
        showDetail: 'none',
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

    // 刪除 Task
    removeTask = (e) => {
        let {id, deleteTask_completed} = this.props;
        // 刪除 database task
        deleteTask_completed(id);
    };

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
        let showSimple = { display: this.state.showSimple };
        let showDetail = { display: this.state.showDetail };

        let {title, deadline, note, completeDate, issueDate} = this.props.content;

        return (
            <div className="completeItem">
                {/* 簡易Task */}
                <div className="completeSimple" style={showSimple}>
                    <div className="completeSimple__title">
                        <input className="completeSimple__title--checkbox" type="checkbox" checked></input>
                        <div className="completeSimple__title--text">{title}</div>
                        <div className="completeSimple__title--iconexpend" onClick={this.showDetailView}><FaEllipsisH /></div>
                        <div className="completeSimple__title--icontrash" onClick={this.removeTask}><FaTrashAlt /></div>
                    </div>
                    <div className="completeSimple__note">
                        {this.renderNoteDeadline()}
                        {this.renderNoteComment()}
                    </div>
                </div>

                {/* 詳細Task */}
                <div className="completeDetail" style={showDetail}>
                    <div className="completeDetail__title">
                        <input className="completeDetail__title--checkbox" type="checkbox" checked></input>
                        <div className="completeDetail__title--text">{title}</div>
                        <div className="completeDetail__title--iconcollapse" onClick={this.showSimpleView}><FaEllipsisH /></div>
                        <div className="completeDetail__title--icontrash" onClick={this.removeTask}><FaTrashAlt /></div>
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