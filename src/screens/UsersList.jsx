import React, { useEffect, useState } from 'react'
import {DataGrid} from "@mui/x-data-grid"
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import {Link} from "react-router-dom"
import { userRows as rows } from "../dummyData"
import { fetchUsers } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const UsersList = () => {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{

        const getUsers=async()=>{
            const res= await fetchUsers();
            if(!res.error)
                setData(res);
            else if(data.error.response.status===401){
                dispatch(logout());
            }
        }
        getUsers();

    },[])

    const handleDelete=(id)=>{
        setData(
            data.filter(item=>item.id!==id)
        )
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 210 },
        { 
            field: 'user', 
            headerName: 'User', 
    
            width: 320,
            renderCell:(params)=>{
                return (
                    <div className="userListUser">
                        <img src={params.row.img} alt="" className="userListImg" />
                        {params.row.fullname}
                    </div>
                )
            }
        },
        { 
            field: 'createdAt', headerName: 'Joined On', width: 200 ,
            
            renderCell:(params)=>{
                let d= new Date(params.row.createdAt)
                return (
                    d.toDateString().substring(4)
                )
            }

        },
       
        {
            field:"action",
            headerName:"Actions", 
            renderCell:(params)=>{
                return(
                    <div className='userList-actions'>
                        <Link to={"/user/"+params.row._id}>
                            <div className='userListEdit-container'>
                                <EditOutlined fontSize='medium' className='userListEdit'/>
                            </div>
                        </Link>
    
                        <div className='userListDelete-container'>
                            <DeleteOutlined className='userListDelete' onClick={()=>handleDelete(params.row.id)} />
                        </div>
                    </div>
                )
            }
        }
      ];


  return (
    <div className='usersList'>
        <DataGrid
            rows={data}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row)=>row._id}
        />
    </div>
  )
}

export default UsersList