import { styled } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FlexBox } from "../flex-box";

const StyledFlexBox = styled(({ children, open, ...rest }) => (
    <FlexBox {...rest}>{children}</FlexBox>
))(({ open, theme }) => ({
    alignItems: "center",
    justifyContent: "space-between",
    ".caretIcon": {
        transition: "transform 250ms ease-in-out",
        ...(theme.direction === "rtl"
            ? {
                transform: open ? "rotate(90deg)" : "rotate(180deg)",
            }
            : {
                transform: open ? "rotate(90deg)" : "rotate(0deg)",
            }),
    },
})); // =================================================================

// =================================================================
const AccordionHeader = (props) => {
    const { sx, open, children, showIcon, ...others } = props;
    return (
        <StyledFlexBox open={open} sx={sx} {...others}>
            {children}
            {showIcon && <ChevronRightIcon className="caretIcon" fontSize="small" />}
        </StyledFlexBox>
    );
}; //  set default props data

AccordionHeader.defaultProps = {
    px: "1rem",
    py: "0.5rem",
    showIcon: true,
};
export default AccordionHeader;
