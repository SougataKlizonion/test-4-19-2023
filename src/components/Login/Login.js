import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState({});
  const [password, setpassword] = useState({});
  const  navigate =useNavigate();
  
  const loginHandler = async (e) => {
    console.log("login");
    e.preventDefault();
    const response = await axios.post("http://localhost:2023/api/v1/login", {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("id",response.data.id)
      localStorage.setItem("token",response.data.token)
      setTimeout(() => {
        navigate('/home')
      }, 1000);
    } else {
      alert(response.data);
    }
    console.log("login hit",);
  };
  
  return (
    <div className="main">
      <div className="inner">
      <div className="login">
        <label>Login</label>
      </div>
      <form action="">
        <li className="inputs">
          <input
            type="text"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </li>
        <li className="inputs">
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          ></input>
        </li>
        <li className="inputs1">
          <input
            type="submit"
            placeholder="submit"
            onClick={loginHandler}
          ></input>
        </li>
      </form>
      </div>
    </div>
  );
};

export default Login;
