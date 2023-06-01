import React from "react";
import "./Tasks.css";
import Task from "./Task";
const tasks = [
  {
    id: 1,
    title: "Finish homework",
    dueDate: "2023-06-05",
    completed: false,
  },
  {
    id: 2,
    title: "Go grocery shopping",
    dueDate: "2023-06-02",
    completed: true,
  },
  {
    id: 3,
    title: "Clean the house",
    dueDate: "2023-06-10",
    completed: false,
  },
  {
    id: 2,
    title: "Go grocery shopping",
    dueDate: "2023-06-02",
    completed: true,
  },
  {
    id: 3,
    title: "Clean the house",
    dueDate: "2023-06-10",
    completed: false,
  },
];

const Tasks = () => {
  return (
    <div className="task-container">
      {tasks.map((task) => {
        // console.log(task);
        return <Task id={task.id} title={task.title} dueDate={task.dueDate} completed={task.completed} key={task.id}/>;
      })}
    </div>
  );
};

export default Tasks;
