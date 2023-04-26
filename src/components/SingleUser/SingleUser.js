import React, { useEffect, useState } from 'react';
import "../SingleUser/SingleUser.css";
import {  useParams} from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SingleUser = () => {
    const navigate = useNavigate();
    const [data, setData]=useState({})
    const { userId } = useParams();
    
   const res = async ()=>{
        const response = await axios.get(`http://localhost:2023/api/v1/user/${userId}`)
    setData(response.data)

   }
    useEffect(() => {
        res()
    }, [])
    
        const deleteHandler=async()=>{
            try {
               const response=await  axios.delete(`http://localhost:2023/api/v1/delete/${userId}`)
               if(response){
                alert("user deleted")
               }
               setTimeout(() => {
                navigate("/home");
               }, 1000);
            } catch (error) {
                alert(error.data)
            }
        }
       
   
  return (
    <div>SingleUser
        <div className='main'>
        <div>
            <div className='first'>
            <li className='second'>
                Name
                <div>
                    {data.name}
                </div>
            </li>
            <li id='image' className='second'>
                <img alt='image' src={data.image}></img>
            </li>
            <li  className="logo1">
                <Link className="link" to={`/edit/${data._id}`}>
                <img src="https://res.cloudinary.com/ddupvpf6i/image/upload/v1682073167/edit-logo_1_nxphz9.png"></img>
                  </Link>
            </li>
            <li  className="logo2">
               <div  onClick={ deleteHandler}>
                <img className="logo" src="https://res.cloudinary.com/ddupvpf6i/image/upload/v1682073337/images_1_rdd5uy.png"></img>
               </div>
            </li>
            </div>
            <li className='third'>
                Phone
                <div>
                    {data.phone}
                </div>
            </li>
            <li className='third'>
                Email
                <div>
                    {data.email}
                </div>
            </li>
        </div>
        </div>
    </div>
  )
}

export default SingleUser