import React from 'react';
import { TiStarOutline, TiStar, TiPencil } from "react-icons/ti";
import { FaRegCalendarAlt, FaRegCommentDots, FaTrashAlt } from "react-icons/fa";
import firebase from './Config';
import NoteDeadline from './NoteDeadline';
import NoteComment from './NoteComment';


class Task extends React.Component {

    state = {
        showTask: 'block',
        showDetail: 'none',
        hollowStar: 'flex',
        fullStar: 'none',
        taskBg: '#8ec06c',

        taskTitle: '',
        deadline: '',
        comment: '',
        order: ''
    };

    componentDidMount(){
        let {title, deadline, note, order} = this.props.content;
        console.log(this.props.content);

        // 初始化
        this.setState({
            taskTitle: title, 
            deadline: deadline,
            comment: note,
            order: order
        });

        // 判斷標記的 Task
        if(order === true){
            this.setState({hollowStar: 'none'});
            this.setState({fullStar: 'flex'});
            this.setState({taskBg: '#f0b849'});
        } else {
            this.setState({hollowStar: 'flex'});
            this.setState({fullStar: 'none'});
            this.setState({taskBg: '#8ec06c'});    
        }
    }

    // 編輯 Task Title
    modifyTaskTitle = (e) => {
        this.setState({taskTitle: e.target.value});
    }

    // 編輯 deadline
    modifyDeadline = (e) => {
        this.setState({deadline: e.target.value});
    };

    // 編輯 comment
    modifyComment = (e) => {
        this.setState({comment: e.target.value});
    };

    // 按編輯按鈕
    handleEditClick = (e) => {
        // UI 
        this.setState({showTask:'none'});
        this.setState({showDetail: 'block'});
    };

    // 取消編輯
    handleCancelClick = (e) => {
        // UI 
        this.setState({showTask:'block'});
        this.setState({showDetail: 'none'});

        // 讓 state 恢復成原始狀態
        let {title, deadline, note} = this.props.content;
        this.setState({
            taskTitle: title, 
            deadline: deadline,
            comment: note
        });
    };

    // 提交編輯後的 task
    handleSaveClick = (e) => {
        // UI 
        this.setState({showTask:'block'});
        this.setState({showDetail: 'none'});

        // 更新資料庫
        let {user, id, modifyTask} = this.props;
        let {taskTitle, deadline, comment} = this.state;
        
        let taskDatabaseRef = firebase.database().ref(`${user}/task/${id}`);
        taskDatabaseRef.child('title').set(taskTitle);
        taskDatabaseRef.child('deadline').set(deadline);
        taskDatabaseRef.child('note').set(comment);

        // 更新父元素 taskDatabase 狀態
        modifyTask(e);
    };

    // 標記重要 task
    onStarClick = async(e) => {
        // UI 
        this.setState({hollowStar: 'none'});
        this.setState({fullStar: 'flex'});
        this.setState({taskBg: '#f0b849'});

        // 記錄在 state 
        await this.setState({order: true});
        
        // 更新資料庫
        let {user, id, modifyTask} = this.props;
        let taskDatabaseRef = firebase.database().ref(`${user}/task/${id}`);
        await taskDatabaseRef.child('order').set(this.state.order);

        // 更新父元素 taskDatabase 狀態
        modifyTask(e);
    };

    // 取消標記重要 task
    cancelStarClick = async(e) => {
        // UI 
        this.setState({hollowStar: 'flex'});
        this.setState({fullStar: 'none'});
        this.setState({taskBg: '#8ec06c'});

        // 記錄在 state 
        await this.setState({order: this.props.content.date});

        // 更新資料庫
        let {user, id, modifyTask} = this.props;
        let taskDatabaseRef = firebase.database().ref(`${user}/task/${id}`);
        await taskDatabaseRef.child('order').set(this.state.order);

        // 更新父元素 taskDatabase 狀態
        modifyTask(e);
    };

    // 刪除 Task
    removeTask = (e) => {
        let {id, user, modifyTask} = this.props;
        let taskDatabaseRef = firebase.database().ref(`${user}/task`);
        
        // 刪除資料庫資料
        taskDatabaseRef.child(id).remove();

        // 更新父元素 taskDatabase 狀態
        modifyTask(e);
    };

    // 顯示 Task 備註欄
    renderNoteDeadline = () => {
        let {deadline} = this.state;
        if(deadline){
            return <NoteDeadline deadline={deadline} />
        }
    };

    renderNoteComment = () => {
        let {comment} = this.state;
        if(comment){
            return <NoteComment comment={comment} />
        }
    };


    render(){
        let showTask = { display: this.state.showTask };
        let showDetail = { display: this.state.showDetail };
        let hollowStar = { display: this.state.hollowStar };
        let fullStar = { display: this.state.fullStar };
        let taskBg = { backgroundColor: this.state.taskBg };

        let {title} = this.props.content;
        let {taskTitle, deadline, comment} = this.state;

        return (
            <div className="taskList__item">
                {/* 簡易Task */}
                <div className="taskItem" style={{...showTask, ...taskBg}}>
                    <div className="taskItem__title">
                        <input className="taskItem__title--checkbox" type="checkbox"></input>
                        <div className="taskItem__title--text">{title}</div>
                        <div className="taskItem__title--iconstar" style={hollowStar} onClick={this.onStarClick}><TiStarOutline /></div>
                        <div className="taskItem__title--iconstar-full" style={fullStar} onClick={this.cancelStarClick}><TiStar /></div>
                        <div className="taskItem__title--iconedit" onClick={this.handleEditClick}><TiPencil /></div>
                        <div className="taskItem__title--icontrash" onClick={this.removeTask}><FaTrashAlt /></div>
                    </div>
                    <div className="taskItem__note">
                        {this.renderNoteDeadline()}
                        {this.renderNoteComment()}
                    </div>
                </div>

                {/* 詳細Task */}
                <div className="taskDetail" style={showDetail}>
                    <div className="taskDetail__title" style={taskBg}>
                        <input className="taskDetail__title--checkbox" type="checkbox"></input>
                        <input className="taskDetail__title--text" type="text" placeholder={taskTitle} onChange={this.modifyTaskTitle}></input>
                        <div className="taskDetail__title--iconstar" style={hollowStar} onClick={this.onStarClick}><TiStarOutline /></div>
                        <div className="taskDetail__title--iconstar-full" style={fullStar} onClick={this.cancelStarClick}><TiStar /></div>
                        <div className="taskDetail__title--iconedit" onClick={this.handleEditClick}><TiPencil /></div>
                        <div className="taskDetail__title--icontrash" onClick={this.removeTask}><FaTrashAlt /></div>
                    </div>

                    <div className="taskDetail__content">
                        <div className="taskDetail__content--deadline">
                            <FaRegCalendarAlt />
                            <div>Deadline</div>
                        </div>
                        <div className="taskDetail__content--input">
                            <input type="date" className="taskDetail__content--input--date" onChange={this.modifyDeadline} value={deadline}></input>
                        </div>
                        <div className="taskDetail__content--comment">
                            <FaRegCommentDots />
                            <div>Comment</div>
                        </div>
                        <textarea className="taskDetail__content--inputcomment" onChange={this.modifyComment} value={comment}></textarea>
                    </div>

                    <div type="submit" className="taskDetail__submit">
                        <div className="taskDetail__submit--cancel" onClick={this.handleCancelClick}>&#10006; Cancel</div>
                        <div className="taskDetail__submit--save" onClick={this.handleSaveClick}>&#10004; Save</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Task;