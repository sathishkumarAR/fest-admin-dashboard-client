import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { fetchOrders } from '../redux/apiCalls'
import { logout } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';


const WidgetLg = () => {

    const [orders, setOrders]= useState([]);
    const dispatch= useDispatch();

    useEffect(()=>{

        const getOrders=async()=>{

            const data=await fetchOrders();
            if(!data.error){
                setOrders(data)
            }else if(data.error.response.status===401){
                dispatch(logout());
            }
        }
        getOrders();
    },[])


  return (
    <div className='widgetLg-container'>
        <h3 className="widgetLgTitle">Latest Transactions</h3>
        <table className="widgetLgTable">
            <tr className="widgetLgTr">
                <th className="widgetLgTh">Customer</th>
                <th className="widgetLgTh">Date</th>
                <th className="widgetLgTh">Amount</th>
                <th className="widgetLgTh">Status</th>
            </tr>
            {
                orders.map((order,index)=>(

                    <tr className="widgetLgTr" key={index}>
                        <td className="widgetLgTd-1">
                            <img src={order.user.img} alt="" className="widgetLgItemImg" />
                            <span>{order.user.fullname}</span>
                        </td>
                        <td className="widgetLgTd-2">{dayjs(order.createdAt).format('DD MMM YYYY')}</td>
                        <td className="widgetLgTd-3">₹{parseFloat(order.amount).toFixed(2)}</td>
                        <td className="widgetLgTd-4">
                            <button className={"widgetLgTd-button "+order.status}>{order.status}</button>
                        </td>
                    </tr>

                ))
                
            }
        </table>
    </div>
  )
}

export default WidgetLg