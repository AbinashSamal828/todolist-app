import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import styles from './Register.module.css';
import "./Home.css";

const Login = () => {
  const Navigate = useNavigate();
  const [userid, setuserid] = useState("");
  const [password, setPassword] = useState("");

  const handleuseridChange = (event) => {
    setuserid(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("userid")) {
      Navigate("/");
    }
  }, [Navigate]);
  const validationHandler = () => {
    // console.log(userid, password);
    if (userid === "") {
      toast.error("userid and password is required", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("userid and password is required", toastOptions);
      return false;
    }
    return true;
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    if (validationHandler()) {
      console.log("nope");
      const { data } = await axios.post("http://localhost:5000/login", {
        userid,
        password,
      });
      console.log("YES");
      if (!data.status) {
        toast.error(data.msg, toastOptions);
      } else {
        console.log(data.user);
        localStorage.setItem("userid", data.user.userid);
        Navigate("/");
      }
    }
  };
  return (
    <div className="background">
      <div className="lcontainer">
        <h1>TODOLIST LOGIN</h1>
        <form className="lform" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="userid">userid</label>
            <input
            className="linput"
              type="text"
              id="userid"
              value={userid}
              onChange={handleuseridChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                className="linput"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="btn-primary lbtn">
            Login
          </button>
          <Link to="/register" className="btn-secondary ">
            Go to Register
          </Link>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
