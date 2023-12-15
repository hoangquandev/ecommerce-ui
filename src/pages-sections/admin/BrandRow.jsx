import { useState } from "react";
import { Avatar } from "@mui/material";
import {
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "./StyledComponents"; // ========================================================================
import QudeSwitch from "../../components/QudeSwitch";
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// ========================================================================
const BrandRow = ({ brand, selected }) => {
  const { name, featured, logo, id } = brand;
  const [featuredCategory, setFeaturedCategory] = useState(featured);
  const isItemSelected = selected.indexOf(name) !== -1;
  return (
    <StyledTableRow tabIndex={-1} role="checkbox" selected={isItemSelected}>
      <StyledTableCell align="center">#{id.split("-")[0]}</StyledTableCell>

      <StyledTableCell align="center">{name}</StyledTableCell>

      <StyledTableCell align="center">
        <Avatar
          src={logo}
          sx={{
            width: 55,
            height: "auto",
            margin: "auto",
            borderRadius: 0,
          }}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <QudeSwitch
          color="info"
          checked={featuredCategory}
          onChange={() => setFeaturedCategory((state) => !state)}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton>
          <EditIcon />
        </StyledIconButton>

        <StyledIconButton>
          <DeleteIcon />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default BrandRow;
