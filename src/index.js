import React from 'react';
import ReactDOM from 'react-dom';
import MyTask from './components/MyTask';
import CompleteTask from './components/CompletedTask';

ReactDOM.render(<MyTask />, document.querySelector('.task__inprogress'));
ReactDOM.render(<CompleteTask />, document.querySelector('.task__completed'));