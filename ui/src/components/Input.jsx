import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Input.css";
// import { BsCalendarDate } from "react-icons/bs";
const Input = (props) => {
  const [currtitle, setTitle] = useState("");
  const [currdate, setDate] = useState("");
  const userid=localStorage.getItem("userid");
  // console.log(props);
  if (props.title && props.dueDate) {
    setTitle(props.title);
    setDate(props.dueDate);
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(currtitle);
    if ((currtitle == "")) {
      toast.warn('Task can not be empty', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      return;
    }
    props.addTask({
      id: Math.floor(Math.random() * 1000),
      userid: userid,
      title: currtitle,
      dueDate: currdate,
      completed: false,
    });
    setTitle("");
    setDate("");
  };
  return (
    <div className="input">
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={currtitle}
          onChange={(e) => {
            // console.log(currtitle)
            setTitle(e.target.value);
          }}
        />
        <div className="date-input">
          <input
            type="date"
            id="datepicker"
            value={currdate}
            onChange={(e) => {
              // console.log(currtitle)
              setDate(e.target.value);
            }}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Input;
