import { Box, styled } from '@mui/material'
import React from 'react'

const Wrapper = styled(Box)(({ theme, position, open }) => ({
    left: 0,
    zIndex: 98,
    borderRadius: 4,
    right: "auto",
    padding: "0.5rem"
}))
const CategoryMenuCard = () => {
    return (
        <div>CategoryMenuCard</div>
    )
}

export default CategoryMenuCard