import React from 'react'
import { FlexRowCenter } from '../components/flex-box'
import Login from '../components/sessions/Login'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const LoginPage = () => {
    const isLogin = useSelector(state => state.auth.isLogin)
    const role = useSelector(state => state.auth.user?.role)
    if (isLogin) {
        if (role === "admin") return <Navigate to='/admin' />
        return <Navigate to='/user' />
    }
    return (
        <FlexRowCenter sx={{ width: "100%" }} flexDirection="column" minHeight="100vh">
            <Login />
        </FlexRowCenter>
    )
}

export default LoginPage