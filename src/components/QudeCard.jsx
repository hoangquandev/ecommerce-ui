import { Card, styled } from '@mui/material'
import React from 'react'


const QudeCard = styled(({ hoverEffect, children, ...rest }) => (
    <Card {...rest}>{children}</Card>
))(({ }) => ({
    overflow: 'unset',
    borderRadius: '8px',
    transition: 'all 250ms ease-in-out'
}))


export default QudeCard