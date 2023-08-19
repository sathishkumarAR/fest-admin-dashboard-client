import { Visibility } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../redux/apiCalls'
import {format} from "timeago.js"
import { logout } from '../redux/userSlice'

const WidgetSm = () => {

    const user = useSelector(state=>state.user)
    const [appUsers, setAppUsers] = useState([]);
    const dispatch =useDispatch();
    useEffect(()=>{
        const getData=async()=>{
            if(user.currentUser){
                const data= await fetchUsers();
                if(!data.error){
                    setAppUsers(data);
                }else if(data.error.response.status===401){
                    dispatch(logout());
                }
            }
        }
        getData();
    },[])

  return (
    <div className='widgetSm-container'>
        <span className="widgetSmTitle">
            New Users
        </span>
        <ul className="widgetSmList">
            {
                appUsers &&
                appUsers.map((item,index)=>(

                    <li className="widgetSmListItem" key={index}>
                        <img src={item.img} alt="" className="widgetSmItemImg" />
                        <div className="widgetSmListItemInfo">
                            <span className="widgetSmListItemInfo-title">{item.fullname}</span>
                            {/* <span className="widgetSmListItemInfo-subtitle">{item.address.district}, {item.address.state}</span> */}
                            <span className="widgetSmListItemInfo-subtitle">Joined {format(item.createdAt)}</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className='widgetSmButton-icon' />
                            View
                        </button>
                    </li>

                ))
            }
        </ul>
    </div>
  )
}

export default WidgetSm