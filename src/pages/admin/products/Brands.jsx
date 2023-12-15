import { Box, Card, Stack, Table, TableBody, TableContainer } from '@mui/material'
import React from 'react'
import { H3 } from '../../../components/Typography'
import SearchArea from '../../../components/dashboard/SearchArea'
import Scrollbar from '../../../components/Scrollbar'
import TableHeader from '../../../components/data-table/TableHeader'
import TablePagination from '../../../components/data-table/TablePagination'
import useMuiTable from '../../../hooks/useMuiTable'
import BrandRow from '../../../pages-sections/admin/BrandRow'
const brands = [
    {
        id: "109a66f4-b1a3-45dc-b1e9-9f6912efa928",
        slug: "samsung",
        name: "Samsung",
        image: "/assets/images/brands/samsung.png",
        type: null,
        featured: true,
    },
    {
        id: "1f367909-644b-49f3-8e83-d84d20528e7f",
        slug: "brokeshire's",
        name: "Brokeshire’s",
        image: "/assets/images/brands/brokshire.png",
        type: null,
        featured: false,
    },
    {
        id: "077d40ac-fc19-47ff-90b1-f0d46c7b613a",
        slug: "levis",
        name: "Levis",
        image: "/assets/images/brands/levis.png",
        type: null,
        featured: true,
    },
    {
        id: "be171dfc-8d71-4678-90b9-87ef70be0eff",
        slug: "raymond",
        name: "Raymond",
        image: "/assets/images/brands/raymond.png",
        type: null,
        featured: false,
    },
    {
        id: "8a083533-65f1-497b-bea8-025b3e4e5bb3",
        slug: "apple",
        name: "Apple",
        image: "/assets/images/brands/apple-2.png",
        type: null,
        featured: true,
    },
    {
        id: "fab5ba50-9b12-44e1-9a35-c180a4ce7253",
        slug: "amazon",
        name: "Amazon",
        image: "/assets/images/brands/amazon.png",
        type: null,
        featured: false,
    },
    {
        id: "46fd2b1b-89e6-4e38-9a3e-6de7bb2777f3",
        slug: "alibaba",
        name: "AliBaba",
        image: "/assets/images/brands/alibaba.png",
        type: null,
        featured: true,
    },
    {
        id: "c938bf0a-b752-44e8-97c7-dcbb03959b33",
        slug: "ebay",
        name: "ebay",
        image: "/assets/images/brands/ebay.png",
        type: null,
        featured: true,
    },
];
const tableHeading = [
    {
        id: "id",
        label: "ID",
        align: "center",
    },
    {
        id: "name",
        label: "Name",
        align: "center",
    },
    {
        id: "logo",
        label: "Logo",
        align: "center",
    },
    {
        id: "featured",
        label: "Featured",
        align: "center",
    },
    {
        id: "action",
        label: "Action",
        align: "center",
    },
];


const Brands = () => {

    const filteredBrands = brands.map((item) => ({
        id: item.id,
        name: item.name,
        logo: item.image,
        featured: item.featured,
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
        listData: filteredBrands,
        defaultSort: "name",
    });
    return (
        <Box py={4}>
            <H3 mb={2}>Product Brands</H3>

            <SearchArea
                handleSearch={() => { }}
                buttonText="Add Brand"
                handleBtnClick={() => { }}
                searchPlaceholder="Search Brand..."
            />

            <Card>
                <Scrollbar>
                    <TableContainer
                        sx={{
                            minWidth: 600,
                        }}
                    >
                        <Table>
                            <TableHeader
                                order={order}
                                hideSelectBtn
                                orderBy={orderBy}
                                heading={tableHeading}
                                numSelected={selected.length}
                                rowCount={filteredList.length}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {filteredList.map((brand) => (
                                    <BrandRow brand={brand} key={brand.id} selected={selected} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(filteredList.length / rowsPerPage)}
                    />
                </Stack>
            </Card>
        </Box>
    )
}

export default Brands