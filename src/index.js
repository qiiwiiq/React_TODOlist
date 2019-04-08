import React from 'react';
import ReactDOM from 'react-dom';
import MyTask from './components/MyTask';
import Completed from './components/Completed';

ReactDOM.render(<MyTask />, document.querySelector('.task__inprogress'));
ReactDOM.render(<Completed />, document.querySelector('.task__completed'));