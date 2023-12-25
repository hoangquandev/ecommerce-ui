import React from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from '../components/topbar/Topbar'
import Header from '../components/header/Header'
import Navbar from '../components/navbar/Navbar'

const Public = ({ topbarBgColor, showTopbar = true }) => {
    return (
        <>
            {showTopbar && <Topbar bgcolor={topbarBgColor} />}
            <Header />
            {/* <Navbar /> */}
            <Outlet />
        </>
    )
}

export default Public