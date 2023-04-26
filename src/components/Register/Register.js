import React, { useState } from 'react'
import "./Register.css"
import axios from "axios";
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name ,setName]=useState("")
  const [phone,setPhone]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [message,setMessage]=useState([])
  const [image,setImage]=useState({})
  const navigate =useNavigate();

  function getImageFileObject(imageFile) {
    // console.log(imageFile);
    setImage(imageFile.dataUrl);
  }

  function runAfterImageDelete(file) {
    // console.log({ file })
  }
 const submitHandller= async (e)=>{
  e.preventDefault();
  
  console.log(name, phone ,email ,password,image);
  if(!name || !email || !phone || !password ||!image ){
    alert("input field should not be empty")
  }else{
  try {
    
    console.log("image",image);
    const response = await axios.post("http://localhost:2023/api/v1/data",{
    name ,email ,phone, password,image
  })
  console.log(response.data);
  if(response.data.id){
    localStorage.setItem("id",response.data.id)
    localStorage.setItem("token",response.data.token)
    setTimeout(() => {
      alert("user add sucessful");
    }, 500);
    setTimeout(() => {
      const nav =navigate('/home')
    }, 1000);
  }
  }catch(error){
    setTimeout(() => {
      setMessage(error.msg)
    }, 2000);
    
  }}
 }


  return (
  <div>
    <div className='error'>{message}</div>
    <div className='main-register'>
      <div className='sub-register'>Registration
      <form onSubmit={submitHandller} encType='multipart/form-data' >
        <label className='reg-lable'>Name</label>
        <li><input className='reg-input' type='text'  onChange={(e)=>{setName(e.target.value)}} ></input></li>
        <label className='reg-lable'>Phone</label>
        <li><input className='reg-input' type='number' onChange={(e)=>{setPhone(e.target.value)}}  ></input></li>
        <label className='reg-lable'>Email</label>
        <li><input className='reg-input' type='text'  onChange={(e)=>{setEmail(e.target.value)}} ></input></li>
        <label className='reg-lable'>Password</label>
        <li><input className='reg-input' type='password' onChange={(e)=>{setPassword(e.target.value)}}  ></input></li>
        <label className='reg-lable'>Image</label>
        <div className="image-upload"><ImageUploader 
      onFileAdded={(img) => getImageFileObject(img)}
      onFileRemoved={(img) => runAfterImageDelete(img)}
    /></div>
        <div className='pre-submit'><li><input className='submit' type='submit' ></input></li></div>
      </form>
      </div>
    </div>
  </div>
  )
}

export default Register