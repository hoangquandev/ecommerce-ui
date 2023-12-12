import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material';
import { FlexBox } from './flex-box';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
// import TouchRipple from '@mui/material/ButtonBase/TouchRipple';

const DropDownHandler = styled(FlexBox)(({ theme }) => ({
    whiteSpace: "pre",
    borderTopRightRadius: 300,
    borderBottomRightRadius: 300,
    borderLeft: `1px solid ${theme.palette.text.disabled}`,
    [theme.breakpoints.down("xs")]: {
        display: "none"
    }
}))

export default function BasicMenu({ cat, onClick, categories }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <DropDownHandler
            px={3}
            gap={0.5}
            height="100%"
            color="grey.700"
            bgcolor="grey.100"
            alignItems="center"
        >
            <Button
                fullWidth
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {cat}
                <KeyboardArrowDownOutlinedIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    categories.map((item, index) => {
                        return (
                            item !== cat && <MenuItem
                                key={index}
                                onClick={
                                    () => {
                                        handleClose()
                                        onClick(item)
                                    }
                                }>{item}</MenuItem>
                        )

                    })
                }

            </Menu>
        </DropDownHandler>
    );
}