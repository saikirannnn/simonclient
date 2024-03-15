import React from 'react'
import "./Register.css"
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [username,setUsername]=useState();
  const [password,setPassword]=useState();
  const [email,setEmail]=useState();
  const location=useNavigate();
  const handleName=(e)=>{
  setUsername(e.target.value);
  };
  const handleEmail=(e)=>{
setEmail(e.target.value);
  };
  const handlepass=(e)=>{
setPassword(e.target.value);
  };
  const register=async(e)=>{
    e.preventDefault();
try{
   const res=await axios.post("https://simongame-qpib.onrender.com/register",{username:username,email:email,password:password});
   toast.success(res.data.message);
   location("/login");
}
catch(err){
   toast.error(err?.response?.data?.message);
   console.log("THIS IS ",err)
}
  };

  return (
    <div className='register'>
        <h1>Register</h1>
      <div className="register-container">
      <form >
        <input type="text" onChange={(e)=>handleName(e)} placeholder='Username' />
        <input type="email" onChange={(e)=>handleEmail(e)} placeholder='Email'/>
        <input type="password" onChange={(e)=>handlepass(e)} placeholder='Password'/>
        <button type='submit' onClick={register}>Submit</button>
      </form>
      </div>      
    </div>
  )
}
