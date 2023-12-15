import React, { useEffect, useState, useTransition } from 'react'
import useMuiTable from '../../../hooks/useMuiTable';
import { Box, Card, Dialog, DialogTitle, Stack, Table, TableBody, TableContainer, TextField } from '@mui/material';
import { H3 } from '../../../components/Typography';
import SearchArea from '../../../components/dashboard/SearchArea';
import Scrollbar from '../../../components/Scrollbar';
import TableHeader from '../../../components/data-table/TableHeader';
import TablePagination from '../../../components/data-table/TablePagination';
import CategoryRow from '../../../pages-sections/admin/CategoryRow';
import * as yup from "yup";
import { axiosPrivate } from '../../../apis/axios';
import CategoryForm from '../../../pages-sections/admin/products/ProductForm/CategoryForm';
import { getAllCategories } from '../../../apis/product';

const tableHeading = [
    {
        id: "id",
        label: "ID",
        align: "left",
    },
    {
        id: "name",
        label: "Name",
        align: "left",
    },
    {
        id: "image",
        label: "Image",
        align: "left",
    },
    {
        id: "level",
        label: "Level",
        align: "left",
    },
    {
        id: "featured",
        label: "Featured",
        align: "left",
    },
    {
        id: "action",
        label: "Action",
        align: "center",
    },
];

const Categories = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [search, setSearch] = useState('');
    const [isChange, setChange] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isPending, startTransition] = useTransition();
    const handleSearch = (e) => {
        startTransition(() => {
            const value = e.target?.value
            if (!value) setSearch('')
            else setSearch(value)
        })
    }

    useEffect(() => {
        const getCategories = async () => {
            const res = await getAllCategories()
            if (search) setCategories(res.data.filter(item => item.name.includes(search)))
            else setCategories(res.data)
        }
        getCategories()
        // console.log(res);
    }, [isChange, search])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const filteredCategories = categories?.map((item) => ({
        id: item._id,
        name: item.name,
        // image: item.image,
        // featured: item.featured,
        level: Math.ceil(Math.random() * 1),
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
        listData: filteredCategories,
    });
    const createCategory = async (values) => {
        const res = await axiosPrivate.post('/category', values)
        handleClose()
        setName('')
        setChange(!isChange)
    }
    const updateCategory = async (values) => {
        const res = await axiosPrivate.put(`/category/${id}`, values)
        handleClose()
        setName('')
        setChange(!isChange)
    }
    const deleteCategory = async (id) => {
        setId(id)
        const res = await axiosPrivate.delete(`/category/${id}`)
        setChange(!isChange)
    }

    const validateCategory = yup.object().shape({
        name: yup.string().required("Name is required")
    })
    return (
        <Box py={4}>
            <H3 mb={2}>Product Categories</H3>

            <SearchArea
                handleSearch={handleSearch}
                buttonText="Add Category"
                handleBtnClick={handleClickOpen}
                search={search}
                searchPlaceholder="Search Category..."
            />

            <Card>
                <Scrollbar>
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
                                rowCount={categories.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {filteredList.map((category, index) => (
                                    // <></>
                                    <CategoryRow
                                        item={category}
                                        index={index}
                                        key={category.name}
                                        selected={selected}
                                        handleEdit={() => {
                                            setName(category.name)
                                            setId(category.id)
                                            handleClickOpen()
                                        }}
                                        handleDelete={deleteCategory}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(categories.length / rowsPerPage)}
                    />
                </Stack>
            </Card>
            <Dialog open={open} fullWidth onClose={handleClose}>
                <DialogTitle>{name ? 'Edit Category' : 'New Category'}</DialogTitle>
                <CategoryForm handleClick={id ? updateCategory : createCategory} name={name} validateCategory={validateCategory} handleClose={handleClose} />
            </Dialog>
        </Box>
    )
}

export default Categories