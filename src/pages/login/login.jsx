import React from 'react'
import "./Login.css";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login() {
const [username,setUsername]=useState();
const [password,setPassword]=useState();
const location=useNavigate();
const handleName=(e)=>{
  
setUsername(e.target.value);
}
const handlepass=(e)=>{
  setPassword(e.target.value);
}
const login=async (e)=>{
  e.preventDefault();
    try{
      const res=await axios.post("http://localhost:8000/login",{username:username,password:password});
      console.log(res.data.message);
      toast.success(res.data.message);
      localStorage.setItem("user",username);
     location("/");
    }
    catch(err){
      toast.error(err?.response?.data?.message);
      console.log(err);
    }
};

  return (
    <div className='Login'>
      <h1>LOGIN</h1>
      <div className="container">
      <form >
        <input type="text" onChange={(e)=>handleName(e)} placeholder='Username' />
        <input type="password" onChange={(e)=>handlepass(e)} placeholder='Password'/>
        <button type='submit' onClick={login}>Submit</button>
      </form>
      </div>
    </div>
  )
}
