import React from 'react'
import productData from '../../../data/product'
import useMuiTable from '../../../hooks/useMuiTable';
import { Box, Card, Stack, Table, TableContainer } from '@mui/material';
import TableBody from "@mui/material/TableBody";
import { H3 } from '../../../components/Typography';
import SearchArea from '../../../components/dashboard/SearchArea';
import Scrollbar from '../../../components/Scrollbar';
import TableHeader from '../../../components/data-table/TableHeader';
import ProductRow from '../../../pages-sections/admin/products/ProductForm/ProductRow';
import TablePagination from '../../../components/data-table/TablePagination';
import { useNavigate } from 'react-router-dom';


const tableHeading = [
    {
        id: "name",
        label: "Name",
        align: "left",
    },
    {
        id: "category",
        label: "Category",
        align: "left",
    },
    {
        id: "brand",
        label: "Brand",
        align: "left",
    },
    {
        id: "price",
        label: "Price",
        align: "left",
    },
    {
        id: "published",
        label: "Published",
        align: "left",
    },
    {
        id: "action",
        label: "Action",
        align: "center",
    },
];

const ProductList = () => {
    const products = productData
    const navigate = useNavigate()
    const filteredProducts = products.map((item) => ({
        id: item.id,
        name: item.title,
        brand: item.brand,
        price: item.price,
        image: item.thumbnail,
        published: item.published,
        category: item.categories[0],
    }));
    const {
        order,
        orderBy,
        selected,
        rowsPerPage,
        filteredList,
        handleChangePage,
        handleRequestSort,
    } = useMuiTable({
        listData: filteredProducts,
    });
    return (
        <Box py={4}>
            <H3 mb={2}>Product List</H3>

            {/* <SearchArea
                handleSearch={() => { }}
                buttonText="Add Product"
                handleBtnClick={() => { navigate('/products/create') }}
                searchPlaceholder="Search Product..."
            /> */}

            <Card>
                <Scrollbar autoHide={false}>
                    <TableContainer
                        sx={{
                            minWidth: 900,
                        }}
                    >
                        <Table>
                            <TableHeader
                                order={order}
                                hideSelectBtn
                                orderBy={orderBy}
                                heading={tableHeading}
                                rowCount={products.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}

                            />

                            <TableBody >
                                {filteredList.map((product, index) => {
                                    return (
                                        <ProductRow product={product} key={index} />
                                    )
                                }
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(products.length / rowsPerPage)}
                    />
                </Stack>
            </Card>
        </Box>
    )
}

export default ProductList