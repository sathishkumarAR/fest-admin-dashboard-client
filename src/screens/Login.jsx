import { TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../redux/apiCalls';

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();

    const handleLogin = (e)=>{
        e.preventDefault();
        login(dispatch,{email,password})
    }


  return (
    <div className="loginContainer">
        <div className="loginLeftContainer">
            <img src="https://res.cloudinary.com/wings06/image/upload/v1671947666/ecommerce-fest/11668583_20945597_tlikgt.jpg" 
            alt="" 
            className="loginLeftImg" 
            />
        </div>
        <div className="loginDivider"></div>
        <div className="loginRightContainer">
            <div className='loginRightInnerContainer'>
                <h3 className="loginRightTitle">
                    Login as an Admin
                </h3>
                <TextField
                    className='userInputField'
                    id="outlined-basic" 
                    label="Email" 
                    variant="filled"
                    size="small"
                    fullWidth
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <TextField
                    className='userInputField'
                    id="outlined-basic" 
                    label="Password" 
                    variant="filled"
                    size="small"
                    fullWidth
                    type="password"
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="loginBtn" onClick={handleLogin}>
                    LOGIN
                </button>
            </div>
        </div>
    </div>
  )
}

export default Login