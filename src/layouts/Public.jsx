import React from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from '../components/topbar/Topbar'
import Header from '../components/header/Header'

const Public = ({ topbarBgColor, showTopbar = true }) => {
    return (
        <>
            {showTopbar && <Topbar bgcolor={topbarBgColor} />}
            <Header />
            <Outlet />
        </>
    )
}

export default Public