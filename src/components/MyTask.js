import React from 'react';
import Task from './Task';

class MyTask extends React.Component {
    state = { inputTask: '' };

    // 輸入 Task
    onTaskInput = (e) => {
        this.setState({inputTask: e.target.value});
    }

    // 提交 Task
    onTaskSubmit = (e) => {
        e.preventDefault();
        this.props.onTaskSubmit(this.state.inputTask);

        // 清空輸入框
        let input = e.target.querySelector('input');
        input.value = '';
    }

    // 繪出每一個 Task
    renderTask = () => {
        let {user, taskDatabase, modifyTask, deleteTask, completeTask} = this.props;

        if(taskDatabase !== []){
            let task = taskDatabase.map((item) => {
                return (
                    <Task 
                        key={item.key} 
                        id={item.key} 
                        content={item.content} 
                        user={user}
                        modifyTask={modifyTask}
                        deleteTask={deleteTask} 
                        completeTask={completeTask}
                    />
                );
            });

            return task;
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