import { Card, styled } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
export const SearchOutlined = styled(SearchOutlinedIcon)(({ theme }) => ({
  color: theme.palette.grey[600],
  marginRight: 6,
}));
export const SearchResultCard = styled(Card)(() => ({
  zIndex: 99,
  top: "100%",
  width: "100%",
  position: "absolute",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
}));
