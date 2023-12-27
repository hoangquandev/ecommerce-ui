
import { Fragment, useCallback, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveIcon from '@mui/icons-material/Remove';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Button, Chip, IconButton, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LazyImage from "../LazyImage";
import QudeCard from "../QudeCard";
import QudeRating from "../QudeRating";
// import { useAppContext } from "contexts/AppContext";
// import ProductViewDialog from "components/products/ProductViewDialog";
import { FlexBox } from "../flex-box";
import { calculateDiscount, currency } from "../../utils/lib";
import { H3, Span } from "../Typography";
import { Link } from "react-router-dom";

const StyledQudeCard = styled(QudeCard)(() => ({
    height: "100%",
    margin: "auto",
    display: "flex",
    overflow: "hidden",
    borderRadius: "8px",
    position: "relative",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "all 250ms ease-in-out",
    ":hover": {
        "& .hover-box": {
            opacity: 1,
        },
    },
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
    textAlign: "center",
    position: "relative",
    display: "inline-block",
    [theme.breakpoints.down("sm")]: {
        display: "block",
    },
}));
const StyledChip = styled(Chip)(() => ({
    zIndex: 1,
    top: "10px",
    left: "10px",
    paddingLeft: 3,
    paddingRight: 3,
    fontWeight: 600,
    fontSize: "10px",
    position: "absolute",
}));
const HoverIconWrapper = styled(Box)(() => ({
    zIndex: 2,
    top: "7px",
    opacity: 0,
    right: "15px",
    display: "flex",
    cursor: "pointer",
    position: "absolute",
    flexDirection: "column",
    transition: "all 0.3s ease-in-out",
}));
const ContentWrapper = styled(Box)(() => ({
    padding: "1rem",
    "& .title, & .categories": {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
})); // ========================================================

// ========================================================
const ProductCard1 = ({
    id,
    slug,
    name,
    price,
    imgUrl,
    rating = 5,
    hideRating,
    hoverEffect,
    discount = 5,
    showProductSize,
}) => {
    const { enqueueSnackbar } = useSnackbar();
    // const { state, dispatch } = useAppContext();
    const [openModal, setOpenModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleIsFavorite = () => setIsFavorite((fav) => !fav);

    const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);
    const cartItem = {}
    // state.cart.find((item) => item.slug === slug);

    const handleCartAmountChange = (product, type) => () => {
        // dispatch({
        //     type: "CHANGE_CART_AMOUNT",
        //     payload: product,
        // }); // SHOW ALERT PRODUCT ADDED OR REMOVE

        if (type === "remove") {
            enqueueSnackbar("Remove from Cart", {
                variant: "error",
            });
        } else {
            enqueueSnackbar("Added to Cart", {
                variant: "success",
            });
        }
    };

    return (
        <StyledQudeCard hoverEffect={hoverEffect}>
            <ImageWrapper>
                {!!discount && (
                    <StyledChip color="primary" size="small" label={`${discount}% off`} />
                )}

                <HoverIconWrapper className="hover-box">
                    <IconButton onClick={toggleDialog}>
                        <RemoveRedEyeIcon color="disabled" fontSize="small" />
                    </IconButton>

                    <IconButton onClick={toggleIsFavorite}>
                        {isFavorite ? (
                            <FavoriteIcon color="primary" fontSize="small" />
                        ) : (
                            <FavoriteBorderIcon fontSize="small" color="disabled" />
                        )}
                    </IconButton>
                </HoverIconWrapper>

                <Link to={`/product/${slug}`}>
                    <LazyImage
                        src={imgUrl ? imgUrl : "https://www.basispet.com/cdn/shop/products/Gift_Card_New.png?v=1383393411"}
                        width={300}
                        height={300}
                        // layout="responsive"
                        alt={name}
                    />
                </Link>
            </ImageWrapper>

            {/* <ProductViewDialog
                openDialog={openModal}
                handleCloseDialog={toggleDialog}
                product={{
                    title,
                    price,
                    id,
                    slug,
                    imgGroup: [imgUrl, imgUrl],
                }}
            /> */}

            <ContentWrapper>
                <FlexBox>
                    <Box flex="1 1 0" minWidth="0px" mr={1}>
                        <Link to={`/product/${slug}`}>
                            <H3
                                mb={1}
                                title={name}
                                fontSize="14px"
                                fontWeight="600"
                                className="title"
                                color="text.secondary"
                            >
                                {name}
                            </H3>
                        </Link>

                        {!hideRating && (
                            <QudeRating value={rating || 0} color="warn" readOnly />
                        )}

                        {showProductSize && (
                            <Span color="grey.600" mb={1} display="block">
                                {showProductSize}
                            </Span>
                        )}

                        <FlexBox alignItems="center" gap={1} mt={0.5}>
                            <Box fontWeight="600" color="primary.main">
                                {calculateDiscount(price, discount)}
                            </Box>

                            {!!discount && (
                                <Box color="grey.600" fontWeight="600">
                                    <del>{currency(price)}</del>
                                </Box>
                            )}
                        </FlexBox>
                    </Box>

                    <FlexBox
                        width="30px"
                        alignItems="center"
                        className="add-cart"
                        flexDirection="column-reverse"
                        justifyContent={!!cartItem?.qty ? "space-between" : "flex-start"}
                    >
                        <Button
                            color="primary"
                            variant="outlined"
                            sx={{
                                padding: "3px",
                            }}
                            onClick={handleCartAmountChange({
                                id,
                                slug,
                                price,
                                imgUrl,
                                name: name,
                                qty: (cartItem?.qty || 0) + 1,
                            })}
                        >
                            <AddIcon fontSize="small" />
                        </Button>

                        {!!cartItem?.qty && (
                            <Fragment>
                                <Box color="text.primary" fontWeight="600">
                                    {cartItem?.qty}
                                </Box>

                                <Button
                                    color="primary"
                                    variant="outlined"
                                    sx={{
                                        padding: "3px",
                                    }}
                                    onClick={handleCartAmountChange(
                                        {
                                            id,
                                            slug,
                                            price,
                                            imgUrl,
                                            name: title,
                                            qty: (cartItem?.qty || 0) - 1,
                                        },
                                        "remove"
                                    )}
                                >
                                    <RemoveIcon fontSize="small" />
                                </Button>
                            </Fragment>
                        )}
                    </FlexBox>
                </FlexBox>
            </ContentWrapper>
        </StyledQudeCard>
    );
};

export default ProductCard1;
