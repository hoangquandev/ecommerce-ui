import { Fragment, useEffect } from "react";
import { Grid, Pagination } from "@mui/material";
import { FlexBetween } from "../flex-box";
import { Span } from "../Typography";
import ProductCard1 from "../product-cards/ProductCard1";
import { calculateAverageRating } from "../../utils/lib";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/slice/filterSlice";
import { useLocation, useSearchParams } from "react-router-dom";

// ========================================================
const ProductCard1List = ({ products, totalPages, totalProducts }) => {
    const currentPage = useSelector(state => parseInt(state.filter.page))
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch()

    // const handleClick = () => {
    //   setSearchParams({page: '1'});
    // };
    const handlePageChange = (event, newPage) => {
        setSearchParams({ page: newPage });
    };
    useEffect(() => {
        if (searchParams.get('page')) {
            dispatch(setPage(searchParams.get('page')))
        } else {
            dispatch(setPage(1))
        }
        // dispatch(setPage(1))
        // setSearchParams({ page: '1' });
    }, [searchParams.get('page')])
    return (
        <Fragment>
            <Grid container spacing={3}>
                {products.map((item) => (
                    <Grid item lg={4} sm={6} xs={12} key={item._id}>
                        <ProductCard1
                            id={item._id}
                            slug={item.slug}
                            name={item.name}
                            price={item.price}
                            rating={calculateAverageRating(item.ratings)}
                            imgUrl={item.thumbnail}
                            discount={1}
                        />
                    </Grid>
                ))}
            </Grid>

            <FlexBetween flexWrap="wrap" mt={4}>
                <Span color="grey.600">{totalProducts} Products</Span>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} variant="outlined" color="primary" />
            </FlexBetween>
        </Fragment>
    );
};

export default ProductCard1List;
