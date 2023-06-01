import React from "react";
import "./Task.css";
import {FaRegCheckSquare} from 'react-icons/fa'
import {AiOutlineEdit} from 'react-icons/ai'
import {AiOutlineDelete} from 'react-icons/ai'

const Task = (props) => {
  const {id, title, dueDate, completed} = props;
//   console.log(props)
    const rshift="<<"

  return (
    <div className="task">
      <div className="desc">
        <div>{title}</div>
        <div>{rshift}{dueDate}</div>
      </div>
      <div className="options">
        <div><FaRegCheckSquare size={25}/></div>
        <div><AiOutlineEdit size={25}/></div>
        <div><AiOutlineDelete size={25}/></div>
      </div>
    </div>
  );
};

export default Task;
