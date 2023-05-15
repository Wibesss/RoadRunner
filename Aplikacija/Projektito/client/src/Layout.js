import React from 'react'
import Header from './Header.js'
import { Outlet } from 'react-router-dom'
const Layout = ({userName}) => {
  return (
    <div className = "p-4 fle flex-col min-h-screen">
        <Header 
        userName={userName}
        />
        <Outlet />
    </div>
  )
}

export default Layout