import { useState } from "react";
import { Avatar } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    StyledTableRow,
    CategoryWrapper,
    StyledIconButton,
    StyledTableCell,
} from "./StyledComponents"; // ========================================================================
import QudeSwitch from "../../components/QudeSwitch";

// ========================================================================
const CategoryRow = ({ item, selected, handleEdit, index, handleDelete }) => {
    const { name, id } = item;
    // console.log(item);
    const [featuredCategory, setFeaturedCategory] = useState(true);
    const isItemSelected = selected.indexOf(name) !== -1;
    return (
        <StyledTableRow tabIndex={-1} role="checkbox" selected={isItemSelected}>
            <StyledTableCell align="left">#{index}</StyledTableCell>

            <StyledTableCell align="left">
                <CategoryWrapper>{name}</CategoryWrapper>
            </StyledTableCell>

            <StyledTableCell align="left">
                <Avatar
                    src={'image'}
                    sx={{
                        borderRadius: "8px",
                    }}
                />
            </StyledTableCell>

            <StyledTableCell align="left">1</StyledTableCell>

            <StyledTableCell align="left">
                <QudeSwitch
                    color="info"
                    checked={featuredCategory}
                    onChange={() => setFeaturedCategory((state) => !state)}
                />
            </StyledTableCell>

            <StyledTableCell align="center">
                <StyledIconButton onClick={handleEdit} >
                    <EditIcon />
                </StyledIconButton>

                {/* <StyledIconButton>
                    <RemoveRedEyeIcon />
                </StyledIconButton> */}

                <StyledIconButton onClick={() => handleDelete(id)}>
                    <DeleteIcon />
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default CategoryRow;
