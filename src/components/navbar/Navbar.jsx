import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Container, styled } from '@mui/material';
import NavLink from '../nav-link/NavLink';
import QudeCard from '../QudeCard';
import { FlexBox } from '../flex-box';
import CategoryMenu from '../categories/CategoryMenu';

const NavBarWrapper = styled(QudeCard)(({ theme, border }) => ({
    height: "60px",
    display: "block",
    position: "relative",
    ...(border && {
        borderBottom: `1px solid ${theme.palette.grey[200]}`
    }),
    [theme.breakpoints.down(1150)]: {
        display: 'none'
    }
}))
const InnerContainer = styled(Container)(() => ({
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between"
}))
// const CategoryMenu = styled(Container)(() => ({
//     display: "flex",
//     height: "100%",
//     alignItems: "center",
//     justifyContent: "space-between"
// }))


const Navbar = () => {
    return (
        <NavBarWrapper border={1}>
            <InnerContainer>
                <CategoryMenu></CategoryMenu>
                <FlexBox gap={4}>
                    <div>hello</div>
                    <div>hello</div>
                </FlexBox>
            </InnerContainer>
        </NavBarWrapper>
    )
}

export default Navbar