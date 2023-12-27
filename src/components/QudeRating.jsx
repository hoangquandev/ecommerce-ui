import { Rating } from "@mui/material";
import { compose, spacing, styled, typography } from "@mui/system";
const QudeRating = styled(Rating)(compose(spacing, typography));
QudeRating.defaultProps = {
    fontSize: "1.25rem",
};
export default QudeRating;
