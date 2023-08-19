import { useState } from 'react'
import { useEffect } from 'react'
import { fetchMonthlyOrderRevenue } from '../redux/apiCalls'
import FeaturedInfoItem from './FeaturedInfoItem'

const FeaturedInfo = () => {

  const [revenue,setRevenue]=useState([]);

  useEffect(()=>{
    const getMonthlyRevenue=async()=>{
      const data= await fetchMonthlyOrderRevenue()
      if(!data.error){
        setRevenue(data)
      }
    }

    getMonthlyRevenue();
  },[])


  return (
    
    <div className='featuredInfo-container'>
        <FeaturedInfoItem 
            title="Revenue"
            value={revenue[1]?.total}
            subvalue={revenue[1] && (((revenue[1].total-revenue[0].total)/revenue[0].total)*100)}
            subvalueTrend={revenue[1] && (revenue[1].total>revenue[0].total?"positive":"negative")}
        />
        <FeaturedInfoItem 
            title="Sales"
            value="4,505"
            subvalue="11.8"
            subvalueTrend="positive"
        />
        <FeaturedInfoItem 
            title="Cost"
            value="2,083"
            subvalue="6"
            subvalueTrend="negative"
        />
        
    </div>
  )
}

export default FeaturedInfo