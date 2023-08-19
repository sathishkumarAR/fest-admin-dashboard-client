import React from 'react'
import { AssessmentOutlined, BarChartOutlined, FeedbackOutlined, HomeOutlined, MailOutline, ManageAccountsOutlined, MessageOutlined, PaidOutlined, PermIdentityOutlined, ReportOutlined, StorefrontOutlined, TimelineOutlined, TrendingUpOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
           
            <div className="sidebarMenu">
                <h3 className="sidebarMenuTitle">
                    Dashboard
                </h3>
                <ul className="sidebarMenuList">

                    <Link to="/" className='link'>
                        <li className="sidebarMenuListItem">
                            <HomeOutlined className='sidebar-icon' />
                            Home
                        </li>
                    </Link>
                    <li className="sidebarMenuListItem">
                        <AssessmentOutlined className='sidebar-icon' />
                        Analytics
                    </li>
                    <li className="sidebarMenuListItem">
                        <TrendingUpOutlined className='sidebar-icon' />
                        Sales
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarMenuTitle">
                    Quick Menu
                </h3>
                <ul className="sidebarMenuList">
                    <Link to="/users" className='link'>
                        <li className="sidebarMenuListItem">
                            <PermIdentityOutlined className='sidebar-icon' />
                            Users
                        </li>
                    </Link>
                    <Link to="/products" className='link'>
                        <li className="sidebarMenuListItem">
                            <StorefrontOutlined className='sidebar-icon' />
                            Products
                        </li>
                    </Link>
                    <li className="sidebarMenuListItem">
                        <PaidOutlined className='sidebar-icon' />
                        Transactions
                    </li>
                    <li className="sidebarMenuListItem">
                        <BarChartOutlined className='sidebar-icon' />
                        Reports
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarMenuTitle">
                    Notifications
                </h3>
                <ul className="sidebarMenuList">
                    <li className="sidebarMenuListItem">
                        <MailOutline className='sidebar-icon' />
                        Mail
                    </li>
                    <li className="sidebarMenuListItem">
                        <FeedbackOutlined className='sidebar-icon' />
                        Feedback
                    </li>
                    <li className="sidebarMenuListItem">
                        <MessageOutlined className='sidebar-icon' />
                        Messages
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarMenuTitle">
                    Staff
                </h3>
                <ul className="sidebarMenuList">
                    <li className="sidebarMenuListItem">
                        <ManageAccountsOutlined className='sidebar-icon' />
                        Manage
                    </li>
                    <li className="sidebarMenuListItem">
                        <TimelineOutlined className='sidebar-icon' />
                        Analytics
                    </li>
                    <li className="sidebarMenuListItem">
                        <ReportOutlined className='sidebar-icon' />
                        Reports
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
  )
}

export default Sidebar