import React from 'react';
import MyTask from './MyTask';
import Completed from './Completed';

class App extends React.Component {
    state ={
        MyTask: 'active',
        MyTaskView: 'block',
        Completed: '',
        CompletedView: 'none'
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

    render(){
        let MyTaskView = {display: this.state.MyTaskView};
        let CompletedView = {display: this.state.CompletedView};
        let class__MyTask = `${this.state.MyTask} nav__mytask`;
        let class__Completed = `${this.state.Completed} nav__completed`;

        return (
            <div>
                <div className="nav">
                    <ul className="tabs">
                        <li className={class__MyTask} onClick={this.onMyTaskClick}>My tasks</li>
                        <li className={class__Completed} onClick={this.onCompletedClick}>Completed</li>
                    </ul>
                </div>

                <div className="tab__content">
                    <div style={MyTaskView} className="task__inprogress"><MyTask /></div>
                    <div style={CompletedView} className="task__completed"><Completed /></div>
                </div>
            </div>
        );
    }
} 

export default App;

