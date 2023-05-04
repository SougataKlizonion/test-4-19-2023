import React, { useState } from 'react'
import "./Register.css"
import axios from "axios";
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import { useNavigate } from "react-router-dom";
import { CloudinaryContext, Image } from 'cloudinary-react';

const Register = () => {
  const [name ,setName]=useState("")
  const [phone,setPhone]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [message,setMessage]=useState([])
  const [image,setImage]=useState(null)
  const navigate =useNavigate();
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
 const submitHandller= async (e)=>{
  e.preventDefault();
  if(!name || !email || !phone || !password ||!image ){
    alert("input field should not be empty")
  }else{
    try {
  const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'ml_default');

    const res =await axios.post(
      'https://api.cloudinary.com/v1_1/ddupvpf6i/image/upload',
      formData
    )
    setImage(res.data.url)
    const response = await axios.post("http://localhost:2023/api/v1/data",{
    name ,email ,phone, password,image
  })
  console.log(response.status);
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
      setMessage(error.response.data)
      alert(error.response.data)
      console.log(error.response.data);
    }, 2000);
    
  }}
 }


  return (
  <div>
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
        <div className="image-upload">
    <input type="file" onChange={handleImageChange} />
    </div>
        <div className='pre-submit'><li><input className='submit' type='submit' ></input></li></div>
      </form>
      </div>
    </div>
  </div>
  )
}

export default Register