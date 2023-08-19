import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react'

const AddUser = () => {


    const [dateValue,setDateValue] = useState(dayjs("1999-08-18T21:11:54"));
    
    const [gender, setGender] = useState();

    const handleChange=(newDateValue)=>{
        setDateValue(newDateValue);
    }
    const handleGenderChange=(newGender)=>{
        setGender(newGender);
    }


  return (
    <div className='addUser-container'>
        <h3 className="addUser-title">
            New User
        </h3>

        <div className="addUser-contentContainer">

            <div className="addUser-contentTopContainer">

                <div className="addUser-imgContainer">

                    <label htmlFor="fileUpload">
                        <img 
                            src="https://res.cloudinary.com/wings05/image/upload/v1625411692/44884218_345707102882519_2446069589734326272_n_u82kmh.jpg" 
                            
                            alt="" 
                            className="addUserImg" 
                        />
                        <input type="file" id="fileUpload" className="addUserImgInput" />
                    </label>

                    <span className="addUserImg-sub">
                        Remove Picture
                    </span>

                </div>

                <div className="addUser-fieldsContainer">
                <div className="addUserRight-box">
                        <span className="addUserRightHeading">
                            Personal Data
                        </span>
                        <div className="addUserRightInputContainer">

                            <div className="addUserRightSplitInput">

                                <TextField 
                                    className='addUserInputField'
                                    id="outlined-basic" 
                                    label="Firstname" 
                                    variant="filled"
                                    defaultValue=""
                                    size="small"
                                    color='primary'
                                    style={{width:"45%"}}
                                />
                                <TextField 
                                    className='addUserInputField ml20px'
                                    id="outlined-basic" 
                                    label="Lastname" 
                                    variant="filled" 
                                    defaultValue=""
                                    size="small"
                                    style={{width:"45%"}}
                                />

                            </div>
                            <div className="addUserRightSplitInput">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                        label="Birthdate"
                                        inputFormat="DD/MM/YYYY"
                                        value={dateValue}
                                        onChange={handleChange}
                                        renderInput={(params) => 
                                            <TextField 
                                                {...params } 
                                                className='addUserInputField' 
                                                variant="filled" 
                                                style={{width:"45%"}}
                                                size="small"
                                            />}
                                    />
                                </LocalizationProvider>

                                <FormControl
                                    className='addUserInputField ml20px' 
                                    variant="filled" 
                                    size="small"
                                    style={{width:"45%"}}
                                >

                                    <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                    
                                    labelId="gender-label"
                                    id="gender"
                                    value={gender}
                                    onChange={handleGenderChange}
                                    >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="pns">Prefer not to say</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>

                        </div>
                    </div>
                    <div className="addUserRight-box">
                        <span className="addUserRightHeading">
                            Contact
                        </span>
                        <div className="addUserRightInputContainer">
                            
                            <div className="addUserRightSplitInput">

                                <TextField 
                                    className='addUserInputField'
                                    id="outlined-basic" 
                                    label="Email" 
                                    variant="filled"
                                    defaultValue=""
                                    size="small"
                                    color='primary'
                                    style={{width:"45%"}}
                                />
                                <TextField 
                                    className='addUserInputField ml20px'
                                    id="outlined-basic" 
                                    label="Mobile" 
                                    variant="filled" 
                                    defaultValue=""
                                    size="small"
                                    style={{width:"45%"}}
                                />

                            </div>

                            <div className="userRightSplitInput">

                                <TextField 
                                    className='userInputField'
                                    id="outlined-basic" 
                                    label="Door No. & Street" 
                                    variant="filled"
                                    size="small"
                                    color='primary'
                                    style={{width:"45%"}}
                                />
                                <TextField 
                                    className='userInputField'
                                    id="outlined-basic" 
                                    label="District" 
                                    variant="filled"
                                    size="small"
                                    style={{width:"45%"}}
                                />

                            </div>
                            <div className="userRightSplitInput">

                                <TextField 
                                    className='userInputField'
                                    id="outlined-basic" 
                                    label="State" 
                                    variant="filled"
                                    size="small"
                                    color='primary'
                                    style={{width:"45%"}}
                                />
                                <TextField 
                                    className='userInputField'
                                    id="outlined-basic" 
                                    label="Pincode" 
                                    variant="filled" 
                                    size="small"
                                    style={{width:"45%"}}
                                />
                                </div>

                        </div>
                    </div>

                </div>

            </div>

            <div className="addUser-contentBottomContainer">
                <button className="adduserBtn">
                    Add User
                </button>
            </div>


        </div>


    </div>
  )
}

export default AddUser