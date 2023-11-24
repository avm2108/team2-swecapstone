import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeadImage from '../Images/HeadImage.png';
import '../App.css'
function Home(){
    
    const navigate = useNavigate();

    const handleLogin = ()=>{
        navigate('/Login');
    }
    const handleRegisterSchool = ()=>{
        navigate('/RegisterSchool');
    }
    return (

        <div className="home-container-main">
        <img src={HeadImage} className='image-Setting' alt="Image not found"/>
        <br/>
        <br/>
        
      <div className='home-container-child'>
        <button className='button-setting' onClick={handleLogin}>Login</button>
        <br></br>
        <button className='button-setting' onClick={handleRegisterSchool}>Register School</button>
        
      </div>
        </div>
    )
}

export default Home;