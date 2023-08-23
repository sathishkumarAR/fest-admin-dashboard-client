import { AccountBalanceWalletOutlined, LocalMallOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import { Alert, Backdrop, Fade, FormControl, InputLabel, MenuItem, Select, Slide, Snackbar, capitalize } from '@mui/material'
import TextField from "@mui/material/TextField"
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchUser, updateUser } from '../redux/apiCalls'
import PuffLoader from "react-spinners/PuffLoader"

const User = () => {

    const [user, setUser]= useState();
    const [staticUser, setStaticUser]= useState();
    const [isLoading, setIsLoading]= useState(false);
    const [updateStatus, setUpdateStatus]= useState({});
    const {userId}= useParams();

    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    useEffect(()=>{
        const getUser=async()=>{
            const data= await fetchUser(userId);
            if(!data.error){
                if(data.gender)
                    data.gender=await capitalize(data.gender)
                setUser(data);
                setStaticUser(data);
            }
        }
        getUser();
    },[userId])

    const capitalize=(text)=>{
        return text[0].toUpperCase().concat(text.slice(1))
    }
    const handleDateChange=(value)=>{
        setUser(prev=>({...prev,birthdate:value.format("L")}))
    }
    const handleChange=(e)=>{
        const fieldName=e.target.name;
        const value=e.target.value;
        setUser(prev=>({...prev,[fieldName]:value}))            
    }
    const handleAddressChange=(e)=>{
        const fieldName=e.target.name;
        const value=e.target.value;
        setUser(prev=>({...prev,address:{...prev.address,[fieldName]:value}}))
    }

    const handleUpdate=async()=>{
        setIsLoading(true);
        const res= await updateUser(userId,user);
        setIsLoading(false);
        if(!res.error){
            setUpdateStatus({
                status:"success",
                message:"Data updated successfully"
            });
            setStaticUser(user);
        }
        else{
            setUpdateStatus({
                status:"error",
                message:res.error.response.data.error
            })
        }
        
    }
    const handleClose=(event, reason)=>{
        if(reason==='clickaway')
            return;

        setUpdateStatus({})
    }

  return (
    <>
        {
            user &&
            (
            <div className='userContainer'>
                <div className='userWrapper'>

                    <div className="userTopContainer">
                        <h3 className="userHeading">
                            User Details
                        </h3>
                        <Link to="/adduser">
                            <button className="userBtn">
                                Create New User
                            </button>
                        </Link>
                    </div>

                    <div className="userCenterContainer">
                        <div className="userCenterLeftContainer">
                            
                            <label htmlFor="fileUpload" className="userLeftImgContainer">
                                <img src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="userImage" />
                                <input type="file" id="fileUpload" className="userLeftImgInput" />
                            </label>

                            <div className="userLeftUserInfo">
                                <span className='userLeftInfo-heading'>{staticUser?.fullname}</span>
                                <span className='userLeftInfo-subheading'>{staticUser?.address.district}</span>
                            </div>
                            <div className="userActivity">
                                <span className="userActivityHeading">Activity</span>
                                <div className="userActivityItem">
                                    <div className="userActivityItem-icon">
                                        <LocalMallOutlined />
                                    </div>
                                    <div className="userActivityItem-info">
                                        <span className="userActivityItem-title">
                                            235
                                        </span>
                                        <span className="userActivityItem-subtitle">
                                            items ordered so far
                                        </span>

                                    </div>
                                </div>
                                <div className="userActivityItem">
                                    <div className="userActivityItem-icon  pink">
                                        <AccountBalanceWalletOutlined />
                                    </div>
                                    <div className="userActivityItem-info">
                                        <span className="userActivityItem-title">
                                        45,875
                                        </span>
                                        <span className="userActivityItem-subtitle">
                                        spent so far
                                        </span>

                                    </div>
                                </div>
                                <div className="userActivityItem">
                                    <div className="userActivityItem-icon orange">
                                        <ThumbUpAltOutlined />
                                    </div>
                                    <div className="userActivityItem-info">
                                        <span className="userActivityItem-title">
                                            88
                                        </span>
                                        <span className="userActivityItem-subtitle">
                                            reviews posted so far
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="userCenterRightContainer">
                            <div className="userRight-box">
                                <span className="userRightHeading">
                                    Personal Data
                                </span>
                                <div className="userRightInputContainer">
                                    <div className="userRightSplitInput">

                                        <TextField 
                                            className='userInputField'
                                            id="outlined-basic" 
                                            name="fullname"
                                            label="Fullname" 
                                            variant="filled"
                                            defaultValue={user.fullname}
                                            onChange={handleChange}
                                            size="small"
                                            color='primary'
                                            style={{width:"45%"}}
                                        />

                                        <FormControl 
                                            className='userInputField' 
                                            variant="filled" 
                                            size="small"
                                            style={{width:"45%"}}
                                        >

                                            <InputLabel id="userType-label">User Type</InputLabel>
                                            <Select
                                            name="userType"
                                            labelId="userType-label"
                                            id="userType"
                                            value={user?.userType}
                                            onChange={handleChange}
                                            >
                                            <MenuItem value="Administrator">Administrator</MenuItem>
                                            <MenuItem value="Seller">Seller</MenuItem>
                                            <MenuItem value="Consumer">Consumer</MenuItem>
                                            </Select>
                                        </FormControl>


                                    </div>
                                    <div className="userRightSplitInput">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                name="dob"
                                                label="Birthdate"
                                                inputFormat="DD/MM/YYYY"
                                                value={user?.birthdate===undefined ? null:user.birthdate}
                                                onChange={handleDateChange}
                                                renderInput={(params) => 
                                                    <TextField 
                                                        {...params } 
                                                        className='userInputField' 
                                                        variant="filled" 
                                                        style={{width:"45%"}}
                                                        size="small"
                                                    />}
                                                disableFuture
                                            />
                                        </LocalizationProvider>

                                        <FormControl 
                                            className='userInputField' 
                                            variant="filled" 
                                            size="small"
                                            style={{width:"45%"}}
                                        >
                                            <InputLabel id="gender-label">Gender</InputLabel>
                                            <Select
                                            labelId="gender-label"
                                            id="gender"
                                            name="gender"
                                            value={user?.gender? user.gender.toLowerCase():""}
                                            onChange={handleChange}
                                            >
                                            <MenuItem value="male">Male</MenuItem>
                                            <MenuItem value="female">Female</MenuItem>
                                            <MenuItem value="prefer not to say">Prefer not to say</MenuItem>
                                            </Select>
                                        </FormControl>

                                    </div>

                                </div>
                            </div>
                            <div className="userRight-box">
                                <span className="userRightHeading">
                                    Contact
                                </span>
                                <div className="userRightInputContainer">
                                    
                                    <div className="userRightSplitInput">

                                        <TextField 
                                            className='userInputField'
                                            id="outlined-basic" 
                                            name="email"
                                            label="Email" 
                                            variant="filled"
                                            defaultValue={user?.email}
                                            disabled
                                            size="small"
                                            color='primary'
                                            style={{width:"45%"}}
                                        />
                                        <TextField 
                                            className='userInputField'
                                            id="outlined-basic" 
                                            name="mobile"
                                            label="Mobile" 
                                            variant="filled" 
                                            value={user?.mobile}
                                            onChange={handleChange}
                                            size="small"
                                            style={{width:"45%"}}
                                        />

                                    </div>
                                    <div className="userRightSplitInput">

                                        <TextField 
                                            className='userInputField'
                                            id="outlined-basic" 
                                            name="doorStreet"
                                            label="Door No. & Street" 
                                            variant="filled"
                                            defaultValue={user?.address?.doorStreet}
                                            onChange={handleAddressChange}
                                            size="small"
                                            color='primary'
                                            style={{width:"45%"}}
                                        />
                                        <TextField 
                                            className='userInputField'
                                            id="outlined-basic" 
                                            name="district"
                                            label="District" 
                                            variant="filled" 
                                            defaultValue={user?.address?.district}
                                            onChange={handleAddressChange}
                                            size="small"
                                            style={{width:"45%"}}
                                        />

                                    </div>
                                    <div className="userRightSplitInput">

                                        <TextField 
                                            className='userInputField'
                                            id="outlined-basic" 
                                            name="state"
                                            label="State" 
                                            variant="filled"
                                            defaultValue={user?.address?.state}
                                            onChange={handleAddressChange}
                                            size="small"
                                            color='primary'
                                            style={{width:"45%"}}
                                        />
                                        <TextField 
                                            className='userInputField'
                                            id="outlined-basic" 
                                            name="pincode"
                                            label="Pincode" 
                                            variant="filled" 
                                            defaultValue={user?.address?.pincode}
                                            onChange={handleAddressChange}
                                            size="small"
                                            style={{width:"45%"}}
                                        />

                                    </div>

                                    {/* <TextField 
                                        className='userInputField'
                                        id="outlined-basic" 
                                        label="Address" 
                                        variant="filled" 
                                        defaultValue="32 Dalal Street, Chennai, India -622201"
                                        size="small"
                                        fullWidth
                                    /> */}

                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="userBottomContainer">
                        <button className="userBtn" onClick={handleUpdate}>
                            Update
                        </button>
                        {/* <button className="userBtn">
                            Cancel
                        </button> */}
                    </div>
                </div>
            </div>
            )

        }
        {
            <Backdrop
                sx={{ backgroundColor: '#ebe8e899', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <PuffLoader
                    color='darkblue'
                    loading={isLoading}
                />
            </Backdrop>
        }
        {
            <Snackbar 
                open={updateStatus.status!==undefined} 
                autoHideDuration={3000} 
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={SlideTransition}
            >
                {
                    updateStatus.status &&
                    <Alert severity={updateStatus.status} variant='filled' onClose={handleClose} >
                        {updateStatus.message}
                    </Alert>

                }
            </Snackbar>
        }

    </>
    
    
  )
}

export default User