import { useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Box } from "@mui/material";
import { currency } from "../../../../utils/lib";
import {
    StyledTableRow,
    CategoryWrapper,
    StyledTableCell,
    StyledIconButton,
} from "../../StyledComponents"; // ========================================================================
import { useNavigate } from "react-router-dom";
import { FlexBox } from "../../../../components/flex-box";
import { Paragraph, Small } from "../../../../components/Typography";
import QudeSwitch from "../../../../components/QudeSwitch";

// ========================================================================
const ProductRow = ({ product }) => {
    const { category, name, price, image, brand, id, published } = product;
    const navigate = useNavigate();
    const [productPulish, setProductPublish] = useState(published);
    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">
                <FlexBox alignItems="center" gap={1.5}>
                    <Avatar
                        src={image}
                        sx={{
                            borderRadius: "8px",
                        }}
                    />
                    <Box>
                        <Paragraph>{name}</Paragraph>
                        <Small color="grey.600">#{id.split("-")[0]}</Small>
                    </Box>
                </FlexBox>
            </StyledTableCell>

            <StyledTableCell align="left">
                <CategoryWrapper>{category}</CategoryWrapper>
            </StyledTableCell>

            <StyledTableCell align="left">
                <Avatar
                    src={brand}
                    sx={{
                        width: 55,
                        height: "auto",
                        borderRadius: 0,
                    }}
                />
            </StyledTableCell>

            <StyledTableCell align="left">{currency(price)}</StyledTableCell>

            <StyledTableCell align="left">
                <QudeSwitch
                    color="info"
                    checked={productPulish}
                    onChange={() => setProductPublish((state) => !state)}
                />
            </StyledTableCell>

            <StyledTableCell align="center">
                <StyledIconButton onClick={() => navigate(`/admin/products/${id}`)}>
                    <EditIcon />
                </StyledIconButton>

                <StyledIconButton>
                    <RemoveRedEyeIcon />
                </StyledIconButton>

                <StyledIconButton>
                    <DeleteIcon />
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default ProductRow;
