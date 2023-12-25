import { Box, styled } from '@mui/material';
import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import DashboardNavbar from '../components/admin/DashboardNavbar';
import DashboardSidebar from '../components/admin/DashboardSidebar';
import { useSelector } from 'react-redux';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const BodyWrapper = styled(Box)(({ theme, compact }) => ({
    transition: "margin-left 0.3s",
    marginLeft: compact ? "86px" : "280px",
    [theme.breakpoints.down("lg")]: {
        marginLeft: 0,
    },
}));
const InnerWrapper = styled(Box)(({ theme }) => ({
    transition: "all 0.3s",
    [theme.breakpoints.up("lg")]: {
        maxWidth: 1200,
        margin: "auto",
    },
    [theme.breakpoints.down(1550)]: {
        paddingLeft: "2rem",
        paddingRight: "2rem",
    },
}));

const Admin = () => {
    // const axiosPrivate = useAxiosPrivate()
    const [sidebarCompact, setSidebarCompact] = useState(0);
    const [showMobileSideBar, setShowMobileSideBar] = useState(0);// handle sidebar toggle for desktop device
    const auth = useSelector(state => state.auth)

    const handleCompactToggle = () =>
        setSidebarCompact((state) => (state ? 0 : 1)); // handle sidebar toggle in mobile device

    const handleMobileDrawerToggle = () =>
        setShowMobileSideBar((state) => (state ? 0 : 1));
    if (!auth.isLogin) return <Navigate to='/login' />
    return (
        <>
            <DashboardSidebar
                sidebarCompact={sidebarCompact}
                showMobileSideBar={showMobileSideBar}
                setSidebarCompact={handleCompactToggle}
                setShowMobileSideBar={handleMobileDrawerToggle}
            />

            <BodyWrapper compact={sidebarCompact ? 1 : 0}>
                <DashboardNavbar handleDrawerToggle={handleMobileDrawerToggle} username={auth.user.userData.name} />
                <InnerWrapper>
                    <Outlet />
                </InnerWrapper>
            </BodyWrapper>
        </>
    )
}

export default Admin