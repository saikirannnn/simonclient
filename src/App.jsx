import {Routes,Route} from "react-router-dom";
import Home from './pages/home/home';
import Login from './pages/login/login'
import Register from './pages/register/register';
import './app.css';
function App() {
  
  return (
    <div >
     
   <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/login" element={<Login/>}/>
    <Route exact path="/register" element={<Register/>}/>
   </Routes>


    </div>
  );
}

export default App;
