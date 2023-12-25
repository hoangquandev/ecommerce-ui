import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import api from '../../apis/axios'

const FlexBox = ({ children, ...props }) => {
    return (
        <Box display={"flex"} {...props}>
            {children}
        </Box>
    )
}

export default FlexBox