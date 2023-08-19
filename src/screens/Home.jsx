import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import Chart from '../components/Chart'
import FeaturedInfo from '../components/FeaturedInfo'
import WidgetLg from '../components/WidgetLg'
import WidgetSm from '../components/WidgetSm'
import { fetchUserStats } from '../redux/apiCalls'
import { logout } from '../redux/userSlice'

const Home = () => {

  const [userStats, setUserStats]=useState([]);
  const dispatch= useDispatch();

  const months=useMemo(()=>[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],[])

  useEffect(()=>{
    const getUserStats=async()=>{
      const data= await fetchUserStats();
      if(!data.error){
        const modifiedData= await data.map((item)=>{
          return {month:months[item._id-1],"Active User":item.totalUsers}
        })
        setUserStats(modifiedData);
      }
      else if(data.error.response.status===401){
        dispatch(logout());
    }
    }

    getUserStats();
  },[months])



  return (
    <div className='home'>
        <FeaturedInfo />

        <Chart 
            title="User Analytics"
            data = {userStats}
            Xaxis_dataKey="month"
            Line_datakey="Active User"
            grid

            className="home-chartContainer"
    
        />

        <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
        </div>
    </div>
  )
}

export default Home