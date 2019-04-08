import React from 'react';
import MyTask from './MyTask';
import Completed from './Completed';
import firebase from './Config';

class App extends React.Component {
    state ={
        MyTask: 'active',
        MyTaskView: 'block',
        Completed: '',
        CompletedView: 'none',

        user: 'Joy',
        taskDatabase: [],
        completedDatabase: []
    }

    // 更新成最新的資料庫內容 -- task
    updateTaskDatabase = () => {
        let taskDatabaseRef = firebase.database().ref(`${this.state.user}/task`);
        taskDatabaseRef.orderByChild('order').once('value', (snapshot) => {
            let orderTask = [];
            snapshot.forEach(function(item){
                let obj = {key: item.key, content: item.val()};
                orderTask.push(obj);
            });
            this.setState({taskDatabase: orderTask});
        });
    }

    // 更新成最新的資料庫內容 -- completed
    updateCompletedDatabase = () => {
        let completedDatabaseRef = firebase.database().ref(`${this.state.user}/completed`);
        completedDatabaseRef.orderByChild('issueDate').once('value', (snapshot) => {
            let orderTask = [];
            snapshot.forEach(function(item){
                let obj = {key: item.key, content: item.val()};
                orderTask.push(obj);
            });
            this.setState({completedDatabase: orderTask});
        });
    }

    componentDidMount(){
        // 讀取資料庫
        this.updateTaskDatabase();
        this.updateCompletedDatabase();
    }

    // 點擊 MyTask 頁籤
    onMyTaskClick = (e) => {
        this.setState({
            MyTask: 'active',
            MyTaskView: 'block',
            Completed: '',
            CompletedView: 'none'
        });
    };

    // 點擊 Completed 頁籤
    onCompletedClick = (e) => {
        this.setState({
            MyTask: '',
            MyTaskView: 'none',
            Completed: 'active',
            CompletedView: 'block'
        });
    };

    // MyTask 頁面
    // 提交 Task
    onTaskSubmit =(task) => {
        let {user} = this.state; 
        let issueDate = new Date().toJSON().slice(0,10);
        let taskDatabaseRef = firebase.database().ref(`${user}/task`);
        
        // task 寫入資料庫
        if(task){
            taskDatabaseRef.push({
                title: task, 
                deadline: '', 
                note: '', 
                issueDate: issueDate,
                completeDate: '', 
                order: issueDate
            });
        }

        // 更新 task 資料狀態
        this.updateTaskDatabase();
    }

    // 更新 Task
    modifyTask = (params) => {
        let {user} = this.state; 
        let {id, taskTitle, deadline, comment, order} = params;
        let taskRef = firebase.database().ref(`${user}/task/${id}`);

        // 更新資料庫
        taskRef.child('title').set(taskTitle);
        taskRef.child('deadline').set(deadline);
        taskRef.child('note').set(comment);
        taskRef.child('order').set(order);
        
        // 更新 task 資料狀態
        this.updateTaskDatabase();
    }

    // 刪除 Task
    deleteTask = (id) => {
        let {user} = this.state; 
        let taskDatabaseRef = firebase.database().ref(`${user}/task`);

        // 刪除資料庫的 Task
        taskDatabaseRef.child(id).remove();

        // 更新 task 資料狀態
        this.updateTaskDatabase();
    }

    // 標記完成的 Task
    completeTask = (params) => {
        let {user} = this.state; 
        let {id, issueDate, title, deadline, note, order} = params;
        let taskDatabaseRef = firebase.database().ref(`${user}/task`);
        let completedTaskDatabaseRef = firebase.database().ref(`${user}/completed`);
        let completeDate = new Date().toJSON().slice(0,10);
        
        // 記錄在資料庫 task complete 區
        completedTaskDatabaseRef.push({
            title: title, 
            deadline: deadline, 
            note: note, 
            issueDate: issueDate,
            completeDate: completeDate,
            order: order
        });

        // 把已完成的 task 從資料庫 task 區移除，兩秒後從畫面消失
        taskDatabaseRef.child(id).remove();
        setTimeout(()=>{
            taskDatabaseRef.orderByChild('order').once('value', (snapshot) => {
                let orderTask = [];
                snapshot.forEach(function(item){
                    let obj = {key: item.key, content: item.val()};
                    orderTask.push(obj);
                });
                this.setState({taskDatabase: orderTask});
            });
        }, 2000);

        // 更新 completed 資料狀態
        this.updateCompletedDatabase();
    }

    // Completed 頁面
    // 刪除 Task
    deleteTask_completed = (id) => {
        let {user} = this.state; 
        let completedDatabaseRef = firebase.database().ref(`${user}/completed`);

        // 刪除資料庫的 Task
        completedDatabaseRef.child(id).remove();

        // 更新 completed 資料狀態
        this.updateCompletedDatabase();
    }

    render(){
        let MyTaskView = {display: this.state.MyTaskView};
        let CompletedView = {display: this.state.CompletedView};
        let class__MyTask = `${this.state.MyTask} nav__mytask`;
        let class__Completed = `${this.state.Completed} nav__completed`;

        let {user, taskDatabase, completedDatabase} = this.state;

        return (
            <div>
                <div className="nav">
                    <ul className="tabs">
                        <li className={class__MyTask} onClick={this.onMyTaskClick}>My tasks</li>
                        <li className={class__Completed} onClick={this.onCompletedClick}>Completed</li>
                    </ul>
                </div>

                <div className="tab__content">
                    <div style={MyTaskView} className="task__inprogress">
                        <MyTask 
                            user={user}
                            taskDatabase={taskDatabase}
                            onTaskSubmit={this.onTaskSubmit}
                            modifyTask={this.modifyTask}
                            deleteTask={this.deleteTask}
                            completeTask={this.completeTask}
                        />
                    </div>
                    <div style={CompletedView} className="task__completed">
                        <Completed 
                            user={user}
                            completedDatabase={completedDatabase}
                            deleteTask_completed={this.deleteTask_completed}
                        />
                    </div>
                </div>
            </div>
        );
    }
} 

export default App;

