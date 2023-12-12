import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const User = () => {
    const { isLogin, user } = useSelector(state => state.auth)
    if (!isLogin) return <Navigate to='/login' />
    if (user.role === 'admin') return <Navigate to='/admin' />
    return (
        <div>User</div>
    )
}

export default User