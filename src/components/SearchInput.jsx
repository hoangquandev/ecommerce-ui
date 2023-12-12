import SearchIcon from '@mui/icons-material/Search';
import { InputBase, styled } from "@mui/material"; // styled component

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    height: 44,
    fontSize: 14,
    width: "100%",
    maxWidth: 350,
    fontWeight: 500,
    padding: "0 1rem",
    borderRadius: "8px",
    color: theme.palette.grey[600],
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
    },
    "::placeholder": {
        color: theme.palette.text.disabled,
    },
}));

const SearchInput = (props) => {
    return (
        <StyledInputBase
            startAdornment={
                <SearchIcon
                    sx={{
                        fontSize: 19,
                        mr: 1,
                    }}
                />
            }
            {...props}
        />
    );
};

export default SearchInput;
