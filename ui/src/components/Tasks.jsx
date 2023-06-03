import React, { useState } from "react";
import "./Tasks.css";
import Task from "./Task";

const Tasks = (props) => {
  const { tasks } = props;
  if (props.sorted) {
    console.log("yupp");
    tasks.sort((a, b) => {
      const adate = new Date(a.dueDate);
      const bdate = new Date(b.dueDate);
      return adate - bdate;
    });
  }
  // const [currtasks,setTasks]= useState(tasks);
  // console.log(props);
  return (
    <div className="task-container">
      {tasks.map((task) => {
        // console.log(task);
        // console.log(localStorage.getItem("userid"))
        if (task.userid == localStorage.getItem("userid"))
          if (!task.completed == props.toBeDone)
            return (
              <Task
                _id={task._id}
                id={task.id}
                title={task.title}
                dueDate={task.dueDate}
                completed={task.completed}
                key={task.id}
                deleteTask={props.deleteTask}
                editTask={props.editTask}
                checkTask={props.checkTask}
              />
            );
      })}
    </div>
  );
};

export default Tasks;
