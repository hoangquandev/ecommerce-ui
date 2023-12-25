import React, { useState } from 'react'
import {
    ListLabel,
    BadgeValue,
    StyledText,
    BulletIcon,
    NavWrapper,
    ExternalLink,
    NavItemButton,
    SidebarWrapper,
    ChevronLeft,
    ListIconWrapper,
} from './LayoutStyledComponents';
import { Avatar, Box, useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { FlexBetween } from '../flex-box';
import Scrollbar from '../Scrollbar';
import { navigations } from './NavigationList';
import SidebarAccordion from './SidebarAccordion';
import logo from '../../assets/1.png'

const TOP_HEADER_AREA = 70;

const DashboardSidebar = (props) => {
    const {
        sidebarCompact,
        showMobileSideBar,
        setShowMobileSideBar,
        setSidebarCompact,
    } = props;
    const [onHover, setOnHover] = useState(false);
    const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
    const COMPACT = sidebarCompact && !onHover ? 1 : 0; // handle active current page
    const navigate = useNavigate()
    const location = useLocation()

    const activeRoute = (path) => (location.pathname === path ? 1 : 0); // handle navigate to another route and close sidebar drawer in mobile device

    const handleNavigation = (path) => {
        setShowMobileSideBar();
        navigate(path);
    };
    const renderLevels = (data) => {
        return data.map((item, index) => {
            if (item.type === "label")
                return (
                    <ListLabel key={index} compact={COMPACT}>
                        {item.label}
                    </ListLabel>
                );

            if (item.children) {
                return (
                    <SidebarAccordion key={index} item={item} sidebarCompact={COMPACT}>
                        {renderLevels(item.children)}
                    </SidebarAccordion>
                );
            } else if (item.type === "extLink") {
                return (
                    <ExternalLink
                        key={index}
                        href={item.path}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <NavItemButton key={item.name} name="child" active={0}>
                            {item.icon ? (
                                <ListIconWrapper>
                                    <item.icon />
                                </ListIconWrapper>
                            ) : (
                                <span className="item-icon icon-text">{item.iconText}</span>
                            )}

                            <StyledText compact={COMPACT}>{item.name}</StyledText>

                            {/* <Box mx="auto" /> */}

                            {item.badge && (
                                <BadgeValue compact={COMPACT}>{item.badge.value}</BadgeValue>
                            )}
                        </NavItemButton>
                    </ExternalLink>
                );
            } else {
                return (
                    <Box key={index}>
                        <NavItemButton
                            key={item.name}
                            className="navItem"
                            active={activeRoute(item.path)}
                            onClick={() => navigate(item.path)}
                        >
                            {item?.icon ? (
                                <ListIconWrapper>
                                    <item.icon />
                                </ListIconWrapper>
                            ) : (
                                <BulletIcon active={activeRoute(item.path)} />
                            )}

                            <StyledText compact={COMPACT}>{item.name}</StyledText>

                            {/* <Box mx="auto" /> */}

                            {item.badge && (
                                <BadgeValue compact={COMPACT}>{item.badge.value}</BadgeValue>
                            )}
                        </NavItemButton>
                    </Box>
                );
            }
        });
    };
    const content = (
        <Scrollbar
            autoHide
            clickOnTrack={false}
            sx={{
                overflowX: "hidden",
                maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`,
            }}
        >
            <NavWrapper compact={sidebarCompact}>
                {renderLevels(navigations)}
            </NavWrapper>
        </Scrollbar>
    );
    return (
        <SidebarWrapper
            compact={sidebarCompact ? 1 : 0}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => sidebarCompact && setOnHover(false)}
        >
            <FlexBetween
                p={2}
                maxHeight={TOP_HEADER_AREA}
                justifyContent={COMPACT ? "center" : "space-between"}
            >
                <Avatar
                    src={logo}
                    sx={{
                        borderRadius: 0,
                        width: 100,
                        marginLeft: COMPACT ? 0 : -2,
                    }}
                />

                <ChevronLeft
                    color="disabled"
                    compact={COMPACT}
                    onClick={setSidebarCompact}
                    sidebarcompact={sidebarCompact ? 1 : 0}
                />
            </FlexBetween>

            {content}
        </SidebarWrapper>
    );
}

export default DashboardSidebar