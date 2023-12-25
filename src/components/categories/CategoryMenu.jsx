import { Box, styled } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CategoryMenuCard from './CategoryMenuCard'


const Wrapper = styled(Box)(({ open }) => ({
    cursor: "pointer",
    position: "relative",
    "& .dropdown-icon": {
        transition: "all 250ms ease-in-out",
        transform: `rotate(${open ? "90deg" : "0deg"})`
    }
}))

const CategoryMenu = ({ isOpen = false, children }) => {
    const [open, setOpen] = useState(isOpen)
    const popoverRef = useRef(open)
    popoverRef.current = open
    const toggleMenu = (e) => {
        if (!isOpen) setOpen(!open)
    }
    const handleDocumentClick = useCallback(() => {
        if (popoverRef.current && !isOpen) setOpen(false)
    }, [isOpen])
    useEffect(() => {
        window.addEventListener("click", handleDocumentClick)
        return () => window.removeEventListener("click", handleDocumentClick)
    }, [handleDocumentClick])
    return (
        <Wrapper open={open}>
            {React.cloneElement(children, {
                open,
                onClick: toggleMenu,
                className: `${children.props.className}`
            })}
            <CategoryMenuCard open={open} />
        </Wrapper>
    )
}

export default CategoryMenu