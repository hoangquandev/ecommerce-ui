import { Badge, Box, Container, Dialog, IconButton, styled, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { layoutConstant } from '../../utils/constants'
import { FlexBox } from '../flex-box'
import { Link, useNavigate } from 'react-router-dom'
import Image from '../Image'
import SearchBox from '../search-box/SearchBox'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Login from '../sessions/Login'
import { useSelector } from 'react-redux'

export const HeaderWrapper = styled(Box)(({ theme }) => ({
    zIndex: 3,
    position: "relative",
    height: layoutConstant.headerHeight,
    transition: "height 250ms ease-in-out",
    background: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
        height: layoutConstant.mobileHeaderHeight
    }
}))

const Header = () => {
    const theme = useTheme();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sidenavOpen, setSidenavOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const downMd = useMediaQuery(theme.breakpoints.down(1150));
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()

    const toggleDialog = () => setDialogOpen(!dialogOpen);

    const toggleSidenav = () => setSidenavOpen(!sidenavOpen);
    return (
        <HeaderWrapper>
            <Container
                sx={{
                    gap: 2,
                    height: "100%",
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <FlexBox
                    mr={2}
                    minWidth="170px"
                    alignItems="center"
                    sx={{
                        display: {
                            xs: "none",
                            md: "flex"
                        }
                    }}
                >
                    <Link to="/">
                        <Image height={44} src='https://bazaar-eight.vercel.app/assets/images/logo2.svg' alt="logo" />
                    </Link>
                </FlexBox>
                <FlexBox justifyContent="center" flex="1 1 0">
                    <SearchBox />
                </FlexBox>
                <FlexBox
                    alignItems="center"
                    sx={{
                        display: {
                            xs: "none",
                            md: "flex"
                        }
                    }}
                >
                    <Box
                        component={IconButton}
                        p={1.25}
                        bgcolor="grey.200"
                        onClick={auth.isLogin ? () => navigate('/user') : toggleDialog}
                    >
                        <PersonOutlinedIcon />
                    </Box>
                    <Badge badgeContent={2} color='primary'>
                        <Box
                            ml={2.5}
                            p={1.25}
                            bgcolor={"grey.200"}
                            component={IconButton}
                        >
                            <ShoppingBagOutlinedIcon />
                        </Box>
                    </Badge>
                </FlexBox>
                {!auth.isLogin && <Dialog
                    scroll="body"
                    open={dialogOpen}
                    fullWidth={isMobile}
                    onClose={toggleDialog}
                >
                    <Login />
                </Dialog>}
            </Container>
        </HeaderWrapper>
    )
}

export default Header