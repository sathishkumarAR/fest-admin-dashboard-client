import { Backdrop, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';
import PuffLoader from 'react-spinners/PuffLoader';

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {isFetching}= useSelector(state=>state.user)
    const [error, setError]= useState();
    const dispatch = useDispatch();

    const handleLogin = async(e)=>{
        setError(null);
        e.preventDefault();
        const res= await login(dispatch,{email,password})
        if(res.error){
            setError(res.error.response.data)
        }
    }


  return (
    <>
        {
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
                            id="email" 
                            label="Email" 
                            variant="filled"
                            size="small"
                            fullWidth
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <TextField
                            className='userInputField'
                            id="password" 
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
                        {
                            error &&
                            <span className='form-error'>{error}</span>
                        }
                    </div>
                </div>
            </div>
        }
        {
            <Backdrop
                sx={{ backgroundColor: '#ebe8e899', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isFetching}
            >
                <PuffLoader
                    color='darkblue'
                    loading={isFetching}
                />
            </Backdrop>
        }
    </>
    
  )
}

export default Login