import React from "react";
import "./Task.css";
import { FaRegCheckSquare } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

const Task = (props) => {
  const {
    _id,
    id,
    title,
    dueDate,
    completed,
    deleteTask,
    editTask,
    checkTask,
  } = props;
  //   console.log(props)
  const rshift = dueDate == "" ? "" : "-";
  const deleteHandler = async () => {
    // const res=await axios.post('http://localhost:5000/delete/'+_id);
    // props.setTasks((prevTasks)=>{
    //   return [...prevTasks].filter(task=>task._id!=_id);
    // })
    // const response = await axios.post("http://localhost:5000/alltasks");
    // props.setTasks(response.data);
    deleteTask(id);
  };
  const editHandler = () => {
    editTask({ id, title, dueDate });
  };
  const checkHandler = () => {
    checkTask({ id });
  };
  return (
    <div className="task">
      {completed && (
        <del>
          <div className="desc">
            <div>{title}</div>
            <div className="date">
              {rshift}
              {dueDate}
            </div>
          </div>
        </del>
      )}
      {!completed && (
        <div className="desc">
          <div>{title}</div>
          <div className="date">
            {rshift}
            {dueDate}
          </div>
        </div>
      )}
      <div className="options">
        <div onClick={checkHandler}>
          <FaRegCheckSquare size={25} />
        </div>
        <div onClick={editHandler}>
          <AiOutlineEdit size={25} />
        </div>
        <div onClick={deleteHandler}>
          <AiOutlineDelete size={25} />
        </div>
      </div>
    </div>
  );
};

export default Task;
