import { styled } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const StyledLink = styled("div")(({ theme, active_route }) => ({
    position: "relative",
    transition: "color 150ms ease-in-out",
    color: active_route === "active" ? theme.palette.primary.main : "inherit",
    "&:hover": {
        color: `${theme.palette.primary.main} !important`
    }
}))

const NavLink = ({ href, children, style, className, ...props }) => {
    const { pathname } = useLocation()
    const checkRouteMatch = () => {
        if (href === "/") return pathname === href;
        return pathname.includes(href)
    }
    const currentRoute = checkRouteMatch()
    return (
        <Link
            to={href}
            style={{ color: "white", textDecoration: 'none' }}
        >
            <StyledLink
                style={style}
                className={clsx(className)}
                active_route={currentRoute ? "active" : ""}
                {...props}
            >
                {children}
            </StyledLink>
        </Link>
    )
}

export default NavLink