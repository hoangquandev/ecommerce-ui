import { AppBar, Box, Button, Container, InputBase, Toolbar, styled, useMediaQuery } from '@mui/material';
import React from 'react'
import { FlexBox, FlexRowCenter } from '../flex-box';
import Toggle from '../icons/Toggle';
import { useNavigate } from 'react-router-dom';
import Globe from '../icons/Globe';
import SearchIcon from '@mui/icons-material/Search';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    zIndex: 11,
    paddingTop: "1rem",
    paddingBottom: "1rem",
    backgroundColor: "#ffffff",
    boxShadow: theme.shadows[2],
    color: theme.palette.text.primary,
}));
const StyledToolBar = styled(Toolbar)(() => ({
    "@media (min-width: 0px)": {
        paddingLeft: 0,
        paddingRight: 0,
        minHeight: "auto",
    },
}));
const ToggleWrapper = styled(FlexRowCenter)(({ theme }) => ({
    width: 40,
    height: 40,
    flexShrink: 0,
    cursor: "pointer",
    borderRadius: "8px",
    backgroundColor: theme.palette.grey[100],
}));
const CustomButton = styled(Button)(({ theme }) => ({
    minHeight: 40,
    flexShrink: 0,
    marginLeft: 16,
    padding: "0 20px",
    borderRadius: "8px",
    backgroundColor: theme.palette.grey[100],
    [theme.breakpoints.down("xs")]: {
        display: "none",
    },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: 200,
    padding: "5px 10px",
    borderRadius: "8px",
    color: theme.palette.grey[500],
    backgroundColor: theme.palette.grey[100],
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
}));

const DashboardNavbar = ({ handleDrawerToggle, username }) => {
    const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
    const navigate = useNavigate()
    return (
        <DashboardNavbarRoot position="sticky">
            <Container maxWidth="xl">
                <StyledToolBar disableGutters>
                    {downLg && (
                        <ToggleWrapper onClick={handleDrawerToggle}>
                            <Toggle />
                        </ToggleWrapper>
                    )}

                    <CustomButton
                        onClick={() => navigate("/")}
                        startIcon={
                            <Globe
                                sx={{
                                    color: "grey.900",
                                }}
                            />
                        }
                    >
                        Browse Website
                    </CustomButton>

                    <Box flexGrow={1} />

                    <FlexBox alignItems="center" gap={2}>
                        <StyledInputBase
                            placeholder="Search anything..."
                            startAdornment={
                                <SearchIcon
                                    sx={{
                                        color: "grey.500",
                                        mr: 1,
                                    }}
                                />
                            }
                        />
                        <NotificationsPopover />

                        <AccountPopover name={username} />
                    </FlexBox>

                </StyledToolBar>
            </Container>
        </DashboardNavbarRoot>
    )
}

export default DashboardNavbar