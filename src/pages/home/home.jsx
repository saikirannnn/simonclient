import React from 'react'
import './Home.css'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Home() {
  const [levelTitle, setLevelTitle] = useState("Press A Key to Start")
  const [level, setLevel] = useState(0);
  var start=false;
  const [userClickedPattern, setUserClickedPattern] = useState([]);
  const buttonColours = ["red", "blue", "green", "yellow"];
  const [gamePattern, setGamePattern] = useState([]);
  const [randomchoosenColor,setRandomchoosenColor]=useState();
 const [choosenColor,setChoosenColor]=useState();
 const [randomNumber, setRandomNumber] = useState(null);
const [previousNumber, setPreviousNumber] = useState(null);
const [name,setName]=useState(null);
const [user,setUser]=useState(false);
const [score,setScore]=useState(0);
const [scoreloaded,setScoreloaded]=useState(false);
const [scores,setScores]=useState([]);
const location=useNavigate();
  const [btnstyles, setBtnstyles] = useState({
    red: {
      backgroundColor: "red",
      margin: "25px",
      display: "inline-block",
      height: "200px",
      width: "200px",
      border: "10px solid black",
      borderRadius: "20%",
      cursor: "pointer",
    },

    blue: {
      backgroundColor: "blue",
      margin: "25px",
      display: "inline-block",
      height: "200px",
      width: "200px",
      border: "10px solid black",
      borderRadius: "20%",
      cursor: "pointer",
    },
    green: {
      backgroundColor: "green",
      margin: "25px",
      display: "inline-block",
      height: "200px",
      width: "200px",
      border: "10px solid black",
      borderRadius: "20%",
      cursor: "pointer",
    },
    yellow: {
      backgroundColor: "yellow",
      margin: "25px",
      display: "inline-block",
      height: "200px",
      width: "200px",
      border: "10px solid black",
      borderRadius: "20%",
      cursor: "pointer",
    }
  });

  useEffect(() => {
    document.addEventListener('keydown', handlekey);
    const val=localStorage.getItem("user");
    
    if(val!==null){
      setName(localStorage.getItem("user"));
      setUser(true);
      
    }
    getAllScores();

  }, []);
  const getAllScores=async()=>{
    try{
       const allScores=await axios.get("http://localhost:8000/user/allScores");
       console.log(allScores.data.message);
       const sortedList=allScores.data.message.sort((a,b)=>b.score-a.score);

       setScores(sortedList);
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect( ()=>{
    
    const findScore=async()=>{
    
      try{
        const res=await axios.post(`http://localhost:8000/user`,{username:name});
        setScore(res.data.score);
        setScoreloaded(true);
      }
      catch(err){
        console.log(err);
      }
    }
    if(name!==null) findScore();
    
  },[name]);

 
  useEffect(() => {
    if(gamePattern!==null&&gamePattern!==undefined&&gamePattern.length>0){
      animatePress(randomchoosenColor);
      playsound(randomchoosenColor);
    }
     
  }, [gamePattern]);

  useEffect( () => {
    const dothis=async ()=>{
      if(userClickedPattern!==null&&userClickedPattern!==undefined&&userClickedPattern.length>0){
        console.log(choosenColor);
        await playsound(choosenColor);
        await animatePress(choosenColor);
        await checkAnswer();
      }
    }
    
     dothis();
  }, [userClickedPattern]);

  useEffect(()=>{
    
    if(choosenColor!==null&&choosenColor!==undefined){
      setUserClickedPattern((prevPattern) => [...prevPattern, choosenColor]);
    }
    
  },[choosenColor]);
  useEffect(()=>{
    if (randomchoosenColor !== null && randomchoosenColor !== undefined) {
      console.log(randomchoosenColor);
      setGamePattern((prevPattern) => [...prevPattern, randomchoosenColor]);
    }
    
  },[randomchoosenColor]);
  
  const handlekey =  async (event) => {
    if (start===false) {
      start=true;
      setLevelTitle(`Level: ${level}`);
      await nextfunction();
    }
    else{
      window.location.reload();
    }
  };
  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * 4);
    if (newRandomNumber !== previousNumber) {
      setRandomchoosenColor(buttonColours[newRandomNumber]);
      setPreviousNumber(newRandomNumber);
    } else {
      generateRandomNumber();
    }
  };
  const nextfunction = async () => {
    try{
       if(name!==null) {
        
        const res=await axios.post("http://localhost:8000/user/score",{username:name,score:level});
       }

    }
    catch(err){
      console.log(err);
    }
    setLevel(level + 1);
    setLevelTitle(`Level: ${level}`);
    await generateRandomNumber();
    
  };
  const playsound = async (color) => {
   
    var audio = new Audio(`./sounds/${color}.mp3`);
    
    await audio.play();
    
  };
  const callThis =async (event) => {
    const getId = event.target.id;
    setChoosenColor("");
    setChoosenColor(getId);
  };
  const animatePress = async (currentColour) => {
    setBtnstyles((prevStyles) => {
      const updatedStyles = { ...prevStyles };
      updatedStyles[currentColour] = {
        ...prevStyles[currentColour],
        backgroundColor: "grey",
        boxShadow: "0 0 20px white",
      };
      return updatedStyles;
    });
  
    await setTimeout(() => {
      setBtnstyles((prevStyles) => {
        const updatedStyles = { ...prevStyles };
        updatedStyles[currentColour] = {
          ...prevStyles[currentColour],
          backgroundColor: `${currentColour}`,
          boxShadow: "none",
        };
        return updatedStyles;
      });
    }, 100);
  };
  const checkAnswer = () => {
    console.log(gamePattern,userClickedPattern);
    if (gamePattern[level-1] === userClickedPattern[level-1]) {
      
         nextfunction();
    }
    else {
       playsound("wrong");
      document.body.style.backgroundColor = "red";
      setLevelTitle("Game Over, Press Any Key to Restart");
      
    }
  };
const handleLogin=()=>{
    location("/login");
};
const handleRegister=()=>{
   location("/register");
};
const handleLogout=()=>{
   localStorage.removeItem("user");
   window.location.reload();
}
  
  

  return (
    <div className='Home'>
      <div className="navbar">
        <h1 id='name' className='onNav'>Simon-Game</h1>
        <h1 className='onNav'>Welcome {user===true?name:"Guest"}</h1>
        <div className="btn-container">
        {user===false?<div className="logged">
        <button className="login-btn" onClick={handleLogin}>Login</button>
        <button className="register-btn" onClick={handleRegister}>Register</button>
        </div>
        :
        <div className="logout">
      <button className='logout-btn' onClick={handleLogout}>Logout</button>
      </div>}
        </div>
      </div>
      <div className="col">
        <div className="matter">
      {scoreloaded &&<h1 id='score'>Your highest score is {score}</h1>}
      <h1 id="level_title">{levelTitle}</h1>
      <div className="home-container">
        <div className="row">

          <button style={btnstyles.green} id="green" onClick={callThis} className="btn green"></button>
          <button style={btnstyles.red} id="red" onClick={callThis} className="btn red"></button>
        </div>

        <div className="row">

          <button style={btnstyles.yellow} id="yellow" onClick={callThis} className="btn yellow"></button>
          <button style={btnstyles.blue} id="blue" onClick={callThis} className="btn blue"></button>

        </div>

      </div>
      </div>
      <div className="leaderboard">
        <h1 id='board-title'>LeaderBoard</h1>
        <div className="score-list">
        <table className="user-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

        </div>
      </div>
      </div>
    </div>
  )
}
