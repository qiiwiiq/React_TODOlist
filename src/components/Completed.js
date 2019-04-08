import React from 'react';
import CompletedTask from './CompletedTask';
import firebase from './Config';

class Completed extends React.Component {

    state = {
        user: 'Joy',
        completedDatabase: []
    }

    // 更新成最新的資料庫內容
    updateDataState = () => {
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
        this.updateDataState();
    }

    // 刪除 Task
    deleteTask = (id) => {
        let {user} = this.state; 
        let completedDatabaseRef = firebase.database().ref(`${user}/completed`);

        // 刪除資料庫的 Task
        completedDatabaseRef.child(id).remove();

        this.updateDataState();
    }

    // 繪出每一個 completed task
    renderCompletedTask = () => {
        let {user, completedDatabase} = this.state;

        if(completedDatabase !== []){
            let completedTask = completedDatabase.map((item) => {
                console.log(item.content);
                return (
                    <CompletedTask 
                        key={item.key} 
                        id={item.key} 
                        content={item.content} 
                        user={user}
                        deleteTask={this.deleteTask}
                    />
                );
            });
            return completedTask;
        }
    }

    render(){
        return (
            <div className="completed">
                {this.renderCompletedTask()}
            </div>
        );
    }
}

export default Completed;