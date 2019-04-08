import React from 'react';
import Task from './Task';
import firebase from './Config';

class MyTask extends React.Component {
    state = {
        user: 'Joy',
        time0: '',
        inputTask: '',
        taskDatabase: {}
    }

    componentDidMount(){
        // 紀錄 React APP 起始時間
        let time0 = Date.now();
        this.setState({time0: time0});

        // 讀取資料庫
        let taskDatabaseRef = firebase.database().ref(`${this.state.user}/task`);
        taskDatabaseRef.orderByChild('order').once('value', (snapshot) => {
            let orderTask = [];
            snapshot.forEach(function(item){
                let obj = {key: item.key, content: item.val()};
                orderTask.push(obj);
            });
            //console.log(orderTask);
            this.setState({taskDatabase: snapshot.val()});
            //console.log(this.state.taskDatabase);
        });
    }

    // 輸入 Task
    onTaskInput = (e) => {
        this.setState({inputTask: e.target.value});
    }

    // 提交 Task
    onTaskSubmit = (e) => {
        e.preventDefault();
        let {user, time0, inputTask} = this.state; 
        let time = time0 + e.timeStamp;
        let issueDate = new Date(time).toJSON().slice(0,10)
        let input = e.target.querySelector('input');
        let taskDatabaseRef = firebase.database().ref(`${user}/task`);
        
        // task 寫入資料庫
        if(input.value){
            taskDatabaseRef.push({
                title: inputTask, 
                deadline: '', 
                note: '', 
                issueDate: issueDate,
                completeDate: '', 
                order: issueDate
            });
        }

        // 清空輸入框
        input.value = '';

        // 讀取資料庫更新狀態
        taskDatabaseRef.orderByChild('order').once('value', (snapshot) => {
            this.setState({taskDatabase: snapshot.val()});
        });
    }

    // 更新 Task
    modifyTask = (params) => {
        let {user} = this.state; 
        let {id, taskTitle, deadline, comment, order} = params;
        let taskDatabaseRef = firebase.database().ref(`${user}/task`);
        let taskRef = firebase.database().ref(`${user}/task/${id}`);

        // 更新資料庫
        taskRef.child('title').set(taskTitle);
        taskRef.child('deadline').set(deadline);
        taskRef.child('note').set(comment);
        taskRef.child('order').set(order);
        
        // 讀取資料庫更新狀態
        taskDatabaseRef.orderByChild('order').once('value', (snapshot) => {
            this.setState({taskDatabase: snapshot.val()});
        });
    }

    // 刪除 Task
    deleteTask = (id) => {
        let {user} = this.state; 
        let taskDatabaseRef = firebase.database().ref(`${user}/task`);

        // 刪除資料庫的 Task
        taskDatabaseRef.child(id).remove();

        // 讀取資料庫更新狀態
        taskDatabaseRef.orderByChild('order').once('value', (snapshot) => {
            this.setState({taskDatabase: snapshot.val()});
        });
    }

    // 標記完成的 Task
    completeTask = (params) => {
        let {user} = this.state; 
        let {id, issueDate, taskTitle, deadline, comment, order} = params;
        let taskDatabaseRef = firebase.database().ref(`${user}/task`);
        let completedTaskDatabaseRef = firebase.database().ref(`${user}/completed`);
        let completeDate = new Date().toJSON().slice(0,10);
        
        // 記錄在資料庫 task complete 區
        completedTaskDatabaseRef.push({
            title: taskTitle, 
            deadline: deadline, 
            note: comment, 
            issueDate: issueDate,
            completeDate: completeDate,
            order: order
        });

        // 把已完成的 task 從資料庫 task 區移除
        taskDatabaseRef.child(id).remove();
        setTimeout(()=>{
            taskDatabaseRef.orderByChild('order').once('value', (snapshot) => {
                this.setState({taskDatabase: snapshot.val()});
            });
        }, 2000);
    }

    // 繪出每一個 Task
    renderTask = () => {
        let {taskDatabase, user} = this.state;

        if(taskDatabase){
            let taskList = [];
            for (let item in taskDatabase){
                taskList.push(
                    <Task 
                        key={item} 
                        id={item} 
                        content={taskDatabase[item]} 
                        user={user}
                        modifyTask={this.modifyTask}
                        deleteTask={this.deleteTask} 
                        completeTask={this.completeTask}
                    />
                );
            }
            return taskList;
        }
    }

    render(){
        return (
            <div className="task">
                <div className="task__input">
                    <form onSubmit={this.onTaskSubmit}>
                        <input className="task__inputarea" type="text" placeholder=" Add Task" onChange={this.onTaskInput}></input>
                    </form>
                    <div>&#43;</div>
                </div>
                <div className="task__list">
                    {this.renderTask()}
                </div>            
            </div>
        );
    }
}

export default MyTask;