import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import "./Login.css";
// import styles from './Login.module.css';
import "./Home.css";

const Register = () => {
  const Navigate = useNavigate();
  const [userid, setuserid] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("userid")) {
      Navigate("/");
    }
  }, [Navigate]);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  //   useEffect(() => {
  //     if (localStorage.getItem("userid")) {
  //       Navigate("/");
  //     }
  //   }, [Navigate]);
  const validationHandler = () => {
    if (userid.length < 3) {
      toast.error("userid length should be greater than 3", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("password should be greater than 8 chars", toastOptions);
      return false;
    }
    return true;
  };
  const useridChangeHandler = (event) => {
    setuserid(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (validationHandler()) {
      const { data } = await axios.post("http://localhost:5000/register", {
        userid,
        password,
      });
      if (!data.status) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem("userid", data.user.userid);
        Navigate("/");
      }
    }
  };
  return (
    <div className="background">
      <div className="lcontainer">
        <h1>TODOLIST REGISTER</h1>
        <form className="lform" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="userid">userid</label>
            <input
              className="linput"
              type="text"
              id="userid"
              value={userid}
              onChange={useridChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="linput"
              type="password"
              id="password"
              value={password}
              onChange={passwordChangeHandler}
            />
          </div>
          <button type="submit" className="btn-primary lbtn">
            Register
          </button>
          <Link to="/login" className="btn-secondary">
            Go to Login
          </Link>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
