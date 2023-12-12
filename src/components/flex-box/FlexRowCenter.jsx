import { Box } from '@mui/material'
import React from 'react'

const FlexRowCenter = ({ children, ...props }) => {
    return (
        <Box display={"flex"} justifyContent="center" alignItems={"center"} {...props}>
            {children}
        </Box>
    )
}

export default FlexRowCenter