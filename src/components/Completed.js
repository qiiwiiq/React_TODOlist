import React from 'react';
import CompletedTask from './CompletedTask';

class Completed extends React.Component {

    // 繪出每一個 completed task
    renderCompletedTask = () => {
        let {user, completedDatabase, deleteTask_completed} = this.props;

        if(completedDatabase !== []){
            let completedTask = completedDatabase.map((item) => {
                return (
                    <CompletedTask 
                        key={item.key} 
                        id={item.key} 
                        content={item.content} 
                        user={user}
                        deleteTask_completed={deleteTask_completed}
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