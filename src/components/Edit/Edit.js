import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Edit.css"
const Edit = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader]=useState(true)
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    setLoader(true)
    axios.get(`http://localhost:2023/api/v1/user/${userId}`).then((result) => {
      setName(result.data.name);
      setEmail(result.data.email);
      setPhone(result.data.phone);
      setLoader(false)
    });
  },[]);
console.log(name);
const submitHandller = async (e) => {
    e.preventDefault();
    try {
      setLoader(true)
      const response = await axios.put(`http://localhost:2023/api/v1/edit/${userId}`, {name,email,phone,});
      setLoader(false)
      if (response.data._id) {
        setTimeout(() => {
          alert("user updated sucessful");
        }, 500);
        setTimeout(() => {
          const nav = navigate("/home");
        }, 1000);
      }
    } catch (error) {
      setMessage(error.response.data);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };
  return (
    <div>
      <div className="error">{message}</div>
      <div className="main-register">
        <div className="sub-register">
          Update
          {loader===true?<div>Loading...</div>:<form onSubmit={submitHandller}>
            <label className="reg-lable">Name</label>
            <li>
              <input
                className="reg-input"
                name="name"
                value={name}
                type="text"
                onChange={(e)=> {
                  setName(e.target.value)
                }}
              ></input>
            </li>
            <label className="reg-lable">Phone</label>
            <li>
              <input
                className="reg-input"
                name="phone"
                value={phone}
                type="number"
                onChange={(e)=> {
                  setPhone(e.target.value)
                }}
              ></input>
            </li>
            <label className="reg-lable">Email</label>
            <li>
              <input
                className="reg-input"
                type="text"
                name="email"
                value={email}
                onChange={(e)=> {
                  setEmail(e.target.value)
                }}
              ></input>
            </li>
            <div className="pre-submit">
              <li>
                <input className="submit" type="submit"></input>
              </li>
            </div>
          </form>}
        </div>
      </div>
    </div>
  );
};

export default Edit;
