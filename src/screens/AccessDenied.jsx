import React from 'react'

const AccessDenied = () => {
  return (
    <div className='accDen-container'>
        <img src="https://res.cloudinary.com/wings06/image/upload/v1671950479/ecommerce-fest/11235950_11132_ji6w1u.jpg" 
            alt=""
            className="accDen-img"
        />
        <h2 className="accDen-title">
            Access Denied
        </h2>
        <div className="accDen-subtitle">
            <p>It looks like you don't have admin access.</p>
            <p>Please contact tech support team</p>
        </div>
    </div>
  )
}

export default AccessDenied