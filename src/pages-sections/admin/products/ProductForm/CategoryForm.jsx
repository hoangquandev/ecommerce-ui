import { Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'

const CategoryForm = ({ name, handleClose, handleClick, validateCategory }) => {
    const categoryForm = useFormik({
        initialValues: {
            name: name,
        },
        validationSchema: validateCategory,
        onSubmit: handleClick
    });
    const { errors, values, touched, handleBlur, handleChange, handleSubmit } = categoryForm

    return (
        <form onSubmit={handleSubmit}>
            <DialogContent >
                {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
        </DialogContentText> */}
                <TextField
                    fullWidth
                    sx={{ marginTop: 1 }}
                    name="name"
                    label="Category Name"
                    color="info"
                    size="medium"
                    placeholder="Name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type='submit'>Save Category</Button>
                </DialogActions>
            </DialogContent>
        </form>
    )
}

export default CategoryForm