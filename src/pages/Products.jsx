import React, { useCallback, useEffect, useState } from 'react'
import { getProducts } from '../apis/product'
import { Box, Card, Container, Grid, IconButton, MenuItem, TextField, useMediaQuery } from '@mui/material';
import { H5, Paragraph } from '../components/Typography';
import { FlexBox } from '../components/flex-box';
import { Apps, ViewList } from '@mui/icons-material';
import ProductFilterCard from '../components/products/ProductFilterCard';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard1List from '../components/products/ProductCard1List';
import { setSortBy, setSortOrder } from '../redux/slice/filterSlice';

const Products = () => {
    const [view, setView] = useState("grid");
    const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const toggleView = useCallback((v) => () => setView(v), []);
    const [products, setProducts] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [totalProducts, setTotalProducts] = useState(null)
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);

    useEffect(() => {
        dispatch(setSortBy('createdAt'))
        dispatch(setSortOrder('desc'))
    }, [])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getProducts()
                setProducts(productsData.products)
                setTotalPages(productsData.totalPages)
                setTotalProducts(productsData.totalProducts)
            } catch (error) {
                console.log(error);
            }
        }

        fetchProducts()
    }, [filter])
    const handleSort = (order, sortby) => {
        dispatch(setSortBy(sortby))
        dispatch(setSortOrder(order))
    }

    return (
        <>
            <Container
                sx={{
                    mt: 4,
                    mb: 6,
                }}>
                {/* TOP BAR AREA */}
                <Card
                    elevation={1}
                    sx={{
                        mb: "55px",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: {
                            sm: "1rem 1.25rem",
                            md: "0.5rem 1.25rem",
                            xs: "1.25rem 1.25rem 0.25rem",
                        },
                    }}>

                    <Box>
                        <H5>Products</H5>
                        {/* <Paragraph color="grey.600">48 results found</Paragraph> */}
                    </Box>
                    <FlexBox
                        alignItems="center"
                        columnGap={4}
                        flexWrap="wrap"
                        my="0.5rem"
                    >
                        <FlexBox alignItems="center" gap={1} flex="1 1 0">
                            <Paragraph color="grey.600" whiteSpace="pre">
                                Sort by:
                            </Paragraph>

                            <TextField
                                select
                                fullWidth
                                size="small"
                                variant="outlined"
                                placeholder="Sort by"
                                defaultValue={sortOptions[1].label}
                                sx={{
                                    flex: "1 1 0",
                                    minWidth: "150px",
                                }}
                            >
                                {sortOptions.map((item) => (
                                    <MenuItem value={item.label} onClick={() => handleSort(item.order, item.value)} key={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FlexBox>
                        <FlexBox alignItems="center" my="0.25rem">
                            <Paragraph color="grey.600" mr={1}>
                                View:
                            </Paragraph>

                            <IconButton onClick={toggleView("grid")}>
                                <Apps
                                    color={view === "grid" ? "primary" : "inherit"}
                                    fontSize="small"
                                />
                            </IconButton>

                            <IconButton onClick={toggleView("list")}>
                                <ViewList
                                    color={view === "list" ? "primary" : "inherit"}
                                    fontSize="small"
                                />
                            </IconButton>

                            {/* SHOW IN THE SMALL DEVICE */}
                            {/* {downMd && (
                                <Sidenav
                                    handle={
                                        <IconButton>
                                            <FilterList fontSize="small" />
                                        </IconButton>
                                    }
                                >
                                    <ProductFilterCard />
                                </Sidenav>
                            )} */}
                        </FlexBox>
                    </FlexBox>
                </Card>

                <Grid container spacing={3}>
                    {/* PRODUCT FILTER SIDEBAR AREA */}
                    <Grid
                        item
                        md={3}
                        sx={{
                            display: {
                                md: "block",
                                xs: "none",
                            },
                        }}
                    >
                        <ProductFilterCard filter={filter} />
                    </Grid>

                    {/* PRODUCT VIEW AREA */}
                    <Grid item md={9} xs={12}>
                        {view === "grid" ? (
                            <ProductCard1List products={products} totalProducts={totalProducts} totalPages={totalPages} />
                        ) : (
                            // <ProductCard9List products={products} />
                            <></>
                        )}
                    </Grid>
                </Grid>

            </Container>
        </>
    )
}
const sortOptions = [
    {
        label: "Oldest",
        value: "createdAt",
        order: "asc"
    },
    {
        label: "Newest",
        value: "createdAt",
        order: "desc"
    },
    {
        label: "Price Low to High",
        value: "price",
        order: "asc"
    },
    {
        label: "Price High to Low",
        value: "price",
        order: "desc"
    },
];
export default Products