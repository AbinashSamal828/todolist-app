import React, { useEffect } from "react";
import "./Home.css";
import Header from "./Header";
import Input from "./Input";
import Tasks from "./Tasks";
import { useState } from "react";
import axios from "axios";
import EditInput from "./EditInput";

// import styles from './Home.module.css';
import './Home.css'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const Navigate=useNavigate();
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
      id: 4,
      title: "Go grocery shopping",
      dueDate: "2023-06-02",
      completed: true,
    },
    {
      id: 5,
      title: "Clean the house",
      dueDate: "2023-06-10",
      completed: false,
    },
  ];
  const [currtasks, setTasks] = useState(tasks);
  const [editOn, setEditOn] = useState(false);
  const [currTitle, setTitle] = useState("");
  const [currDueDate, setDueDate] = useState("");
  const [toBeDone, setToBeDone] = useState(true);
  const [currSorted, setSorted] = useState(false);
  const fetch = async () => {
    const response = await axios.post("http://localhost:5000/alltasks");
    console.log(response);
    setTasks(response.data);
  };
  useEffect(() => {
    if(!localStorage.getItem('userid'))
      Navigate('/login');
    fetch();
  }, []);
  // useEffect(()=>{
  //   if(toBeDone){
  //     document.getElementById('to-be-done').style.backgroundColor="red";
  //     document.getElementById('done-and-dusted').style.backgroundColor="white";
  //   }
  //   else{
  //     document.getElementById('to-be-done').style.backgroundColor="white";
  //     document.getElementById('done-and-dusted').style.backgroundColor="red";
  //   }
  // },[toBeDone]);
  const addTask = async (data) => {
    try {
      console.log(data);
      setTasks((prevTasks) => {
        return [data, ...prevTasks];
      });
      setDueDate("");
      setEditOn(false);
      setTitle("");
      const res = await axios.post("http://localhost:5000/task", data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTask = async (data) => {
    try {
      console.log(data);
      setTasks(currtasks.filter((task) => task.id != data));
      const res = await axios.post("http://localhost:5000/delete/" + data);
    } catch (err) {
      console.log(err);
    }
  };
  const editTask = async (data) => {
    try {
      // console.log(data);
      deleteTask(data.id);
      setDueDate(data.dueDate);
      setTitle(data.title);
      setEditOn(true);
    } catch (err) {
      console.log(err);
    }
  };
  const checkTask = async (data) => {
    try {
      // console.log(data);
      // deleteTask(data._id);
      const ttasks = [...currtasks];
      ttasks.forEach((val, index, arr) => {
        if (val.id == data.id) {
          val.completed = !val.completed;
        }
      });
      setTasks(ttasks);
      const res = await axios.patch("http://localhost:5000/check/" + data.id);
      //   });
      // setTasks((prevTasks) => {
      //   return prevTasks.forEach((val, index, arr) => {
      //     if (index == data._id) {
      //       val.completed = !val.completed;
      //     }
      //   });
      // });
    } catch (err) {
      console.log(err);
    }
  };
  const toBeDoneClass = toBeDone ? "purple" : "white";
  const doneAndDustedClass = toBeDone ? "white" : "purple";
  return (
    <div className="background">
      <div className="container">
        <Header />
        {!editOn && <Input addTask={addTask} />}
        {editOn && (
          <EditInput
            addTask={addTask}
            title={currTitle}
            dueDate={currDueDate}
          />
        )}
        <div className="intro">
          <button className={toBeDoneClass} onClick={() => setToBeDone(true)}>
            To Be Done
          </button>
          <button
            className={doneAndDustedClass}
            onClick={() => setToBeDone(false)}
          >
            Done And Dusted
          </button>
          <button onClick={() => setSorted(!currSorted)}>
            Sort by due date
          </button>
        </div>
        <Tasks
          tasks={currtasks}
          deleteTask={deleteTask}
          editTask={editTask}
          checkTask={checkTask}
          toBeDone={toBeDone}
          sorted={currSorted}
        />
      </div>
    </div>
  );
};

export default Home;
