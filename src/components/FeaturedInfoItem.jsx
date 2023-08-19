import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import React from 'react'

const FeaturedInfoItem = ({title,value,subvalue,subvalueTrend}) => {
  return (
    <div className="featuredInfoItem">
            <span className="featuredTitle">{title}</span>
            <div className="featuredDataContainer">
                <span className="featuredValue">₹{value}</span>
                <span className="featuredSubValue">
                    {
                        subvalueTrend==="positive"?"+":""
                    }
                    {subvalue && parseFloat(subvalue).toFixed(1)+"%"}
                    {
                        subvalueTrend==="positive"? 
                        <ArrowUpward className='featuredIcon' />
                        :
                        <ArrowDownward className='featuredIcon negative' />
                    }
                    
                </span>
            </div>
            <span className="featuredMoreInfo">
                Compared to last month
            </span>
        </div>
  )
}

export default FeaturedInfoItem