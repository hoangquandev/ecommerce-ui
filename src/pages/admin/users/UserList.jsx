import React, { useEffect, useState, useTransition } from 'react'
// import { getAllUsers } from '../../../apis/user';
import useMuiTable from '../../../hooks/useMuiTable';
// import { axiosPrivate } from '../../../apis/axios';
import UserForm from '../../../pages-sections/admin/users/UserForm/UserForm';
import { Box, Button, Card, Dialog, DialogTitle, Stack, Table, TableBody, TableContainer } from '@mui/material';
import { H3 } from '../../../components/Typography';
import SearchArea from '../../../components/dashboard/SearchArea';
import Scrollbar from '../../../components/Scrollbar';
import TableHeader from '../../../components/data-table/TableHeader';
import TablePagination from '../../../components/data-table/TablePagination';
import * as yup from 'yup'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';


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
const UserList = () => {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');
    const [active, setActive] = useState(false);
    const [id, setId] = useState('');
    const [search, setSearch] = useState('');
    const [isChange, setChange] = useState(false);
    const [users, setUsers] = useState([]);
    const [isPending, startTransition] = useTransition();
    const handleSearch = (e) => {
        startTransition(() => {
            const value = e.target?.value
            if (!value) setSearch('')
            else setSearch(value)
        })
    }
    const axiosPrivate = useAxiosPrivate()
    useEffect(() => {
        const getUsers = async () => {
            const res = await axiosPrivate.get('/user')
            // console.log(res.data.users);
            if (search) setUsers(res.data.users.filter(item => item.name.includes(search)))
            else setUsers(res.data.users)
        }
        getUsers()
    }, [isChange, search])
    const handleClickOpen = () => {
        setOpen(true);
        setEdit(false)
    };
    const handleClickEdit = (item) => {
        setOpen(true);
        setEdit(true);
        setName(item.name)
        setActive(item.isBlocked)
        setRole(item.role)
        setMobile(item.mobile)
        setEmail(item.email)
        setId(item.id)
    };

    const handleClose = () => {
        setOpen(false);
    };
    const filteredUsers = users?.map((item) => ({
        id: item._id,
        name: item.name,
        role: item.role,
        isBlocked: item.isBlocked,
        email: item.email,
        mobile: item.mobile,
        // image: item.image,
        // featured: item.featured,
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
        listData: filteredUsers,
    });

    const handleRegister = async (values) => {
        const res = await axiosPrivate.post('/user/register', values)
        setChange(!isChange)
        handleClose()
    };
    const handleUpdateUser = async (values) => {
        const res = await axiosPrivate.put(`/user/${id}`, values)
        setChange(!isChange)
        handleClose()
    };
    const handleDeleteUser = async (UID) => {
        const res = await axiosPrivate.delete(`/user/${idUser}`)
        setChange(!isChange)
        handleClose()
    };

    // const updateCategory = async (values) => {
    //     const res = await axiosPrivate.put(`/user/${id}`, values)
    //     handleClose()
    // }
    // const deleteCategory = async (id) => {
    //     setId(id)
    //     const res = await axiosPrivate.delete(`/category/${id}`)
    //     setChange(!isChange)
    // }
    const NEW_VALUES = {
        name: '',
        email: '',
        mobile: '',
        password: "",
        role: 'user',
        isBlocked: false
    };
    const EDIT_VALUES = {
        name: name,
        email: email,
        mobile: mobile,
        role: role,
        isBlocked: active
    };

    const validationNewSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("invalid email").required("Email is required"),
        mobile: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid'),
        password: yup.string().required("Password is required"),
        role: yup.string().required('required'),
        isBlocked: yup.bool().required('required')
    });
    const validationEditSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("invalid email").required("Email is required"),
        mobile: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid'),
        // password: yup.string().required("Password is required"),
        role: yup.string().required('required'),
        isBlocked: yup.bool().required('required')
    });
    return (
        <Box py={4}>
            <H3 mb={2}>User List</H3>

            <SearchArea
                handleSearch={handleSearch}
                buttonText="Add user"
                handleBtnClick={handleClickOpen}
                search={search}
                searchPlaceholder="Search User..."
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
                                rowCount={users.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {filteredList.map((item, index) => (
                                    <div key={index} >
                                        <div onClick={() => handleClickEdit(item)}>{item.name}</div>
                                        <Button onClick={() => handleDeleteUser(item.id)}>delete</Button>
                                    </div>
                                    // <CategoryRow
                                    //     item={category}
                                    //     index={index}
                                    //     key={category.name}
                                    //     selected={selected}
                                    //     handleEdit={() => {
                                    //         setName(category.name)
                                    //         setId(category.id)
                                    //         handleClickOpen()
                                    //     }}
                                    //     handleDelete={deleteCategory}
                                    // />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(users.length / rowsPerPage)}
                    />
                </Stack>
            </Card>
            <Dialog open={open} fullWidth onClose={handleClose}>
                <DialogTitle>{edit ? 'Edit User' : 'New User'}</DialogTitle>
                <UserForm initialValues={edit ? EDIT_VALUES : NEW_VALUES}
                    validationSchema={edit ? validationEditSchema : validationNewSchema}
                    handleFormSubmit={edit ? handleUpdateUser : handleRegister}
                    edit={edit}
                />
            </Dialog>
        </Box>
    )
}

export default UserList