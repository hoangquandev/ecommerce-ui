import React from 'react'
import { Box } from '@mui/material'
import { H3 } from '../../components/Typography'
import * as yup from 'yup'
import UserForm from '../../pages-sections/admin/users/UserForm/UserForm'
import { axiosPrivate } from '../../apis/axios'

const AccountSetting = () => {
    const INITIAL_VALUES = {
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: "",
        isBlocked: false
    };
    const validationSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("invalid email").required("Email is required"),
        mobile: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid'),
        password: yup.string().required("Password is required"),
        role: yup.string().required('required'),
        isBlocked: yup.bool().required('required')
    });
    const handleFormSubmit = async (values) => {
        const res = await axiosPrivate.post('/user/register', values)
        console.log(res);
    };

    return (
        <>
            <Box py={4}>
                <H3 mb={2}>Add New Product</H3>

                <UserForm
                    initialValues={INITIAL_VALUES}
                    validationSchema={validationSchema}
                    handleFormSubmit={handleFormSubmit}
                />
            </Box>
        </>
    )
}

export default AccountSetting