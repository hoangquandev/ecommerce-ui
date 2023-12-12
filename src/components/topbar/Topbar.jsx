import { Box, Container, styled } from '@mui/material'
import React from 'react'
import { layoutConstant } from '../../utils/constants'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { FlexBox } from '../flex-box';
import Image from '../Image';
import { Span } from '../Typography';
import NavLink from '../nav-link/NavLink';

const TopbarWrapper = styled(Box, {
    shouldForwardProp: (props) => props !== "bgColor",
})(({ theme, bgColor }) => ({
    fontSize: 12,
    height: layoutConstant.topbarHeight,
    background: bgColor,
    color: theme.palette.secondary.contrastText,
    "& .topbarLeft": {
        "& .logo": {
            display: "none"
        },
        "& .title": {
            marginLeft: "10px",
        },
        "@media only screen and (max-width:900px)": {
            "& .logo": {
                display: "block"
            },
            "& > *:not(.logo)": {
                display: "none",
            },
        }
    },
    "& .topbarRight": {
        "& .link": {
            paddingRight: 30,
            color: theme.palette.secondary.contrastText,
        },
        "@media only screen and (max-width:900px)": {
            "& .link": {
                display: "none"
            }
        }
    },
    "& .menuItem": {
        minWidth: 100,
    },
    "& .marginRight": {
        marginRight: "1.25rem",
    },
    "& .handler": {
        height: layoutConstant.topbarHeight,
    },
    "& .smallRoundedImage": {
        height: 15,
        width: 25,
        borderRadius: 2
    },
    "& .menuTitle": {
        fontSize: 12,
        marginLeft: "0.5rem",
        fontWeight: 600
    },

}))

const Topbar = ({ bgcolor }) => {
    return (
        <TopbarWrapper bgcolor={bgcolor}>
            <Container sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <FlexBox className="topbarLeft" alignItems="center">
                    <div className="logo">
                        <Image
                            display="block"
                            height="28px"
                            src="https://bazaar-eight.vercel.app/assets/images/logo.svg"
                            alt="logo"
                        />
                    </div>
                    <FlexBox alignItems="center">
                        <CallOutlinedIcon fontSize='small' />
                        <Span className="title">+ 999 999 999</Span>
                    </FlexBox>
                    <FlexBox alignItems="center" ml={2.5}>
                        <MailOutlinedIcon fontSize='small' />
                        <Span className="title">lehoangquanit@gmail.com</Span>
                    </FlexBox>
                </FlexBox>
                <FlexBox className="topbarRight" alignItems="center">
                    <NavLink className="link" href="/faq">
                        Theme FAQ's
                    </NavLink>
                    <NavLink className="link" href="/help">
                        Need Help?
                    </NavLink>
                </FlexBox>
            </Container>
        </TopbarWrapper>
    )
}

export default Topbar