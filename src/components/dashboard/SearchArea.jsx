import AddIcon from '@mui/icons-material/Add';
import { Button, useMediaQuery } from "@mui/material";
import React from "react"; // ===============================================================
import { FlexBox } from "../flex-box";
import SearchInput from "../SearchInput";

// ===============================================================
const SearchArea = (props) => {
    const { searchPlaceholder, buttonText, handleBtnClick, handleSearch, search } = props;
    const downSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
            <SearchInput placeholder={searchPlaceholder} value={search} onChange={handleSearch} />

            <Button
                color="info"
                fullWidth={downSM}
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                    minHeight: 44,
                }}
                onClick={handleBtnClick}
            >
                {buttonText}
            </Button>
        </FlexBox>
    );
};

SearchArea.defaultProps = {
    buttonText: "Add Product",
    searchPlaceholder: "Search Product...",
};
export default SearchArea;
