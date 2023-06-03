import React, { useState } from "react";
import "./Input.css";
import { BsCalendarDate } from "react-icons/bs";
const Input = (props) => {
  const [currtitle, setTitle] = useState(props.title);
  const [currdate, setDate] = useState(props.dueDate);
  // console.log(props);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(currtitle);
    props.addTask({
      id: Math.floor(Math.random() * 1000),
      userid: localStorage.getItem('userid'),
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
    </div>
  );
};

export default Input;
