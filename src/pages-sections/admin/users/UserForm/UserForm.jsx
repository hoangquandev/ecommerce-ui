import { useState } from "react";
import {
    Button,
    Card,
    Grid,
    MenuItem,
    TextField,
    styled,
    Box,
    alpha,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { Formik } from "formik";
import DropZone from "../../../../components/DropZone";
import { FlexBox } from "../../../../components/flex-box";
import Image from "../../../../components/Image";

const UploadImageBox = styled(Box)(({ theme }) => ({
    width: 70,
    height: 70,
    display: "flex",
    overflow: "hidden",
    borderRadius: "8px",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: alpha(theme.palette.info.light, 0.1),
}));
const StyledClear = styled(ClearIcon)(() => ({
    top: 5,
    right: 5,
    fontSize: 14,
    cursor: "pointer",
    position: "absolute",
})); // ================================================================

// ================================================================
const UserForm = (props) => {
    const { initialValues, validationSchema, handleFormSubmit, edit } = props;
    const [files, setFiles] = useState([]); // HANDLE UPDATE NEW IMAGE VIA DROP ZONE

    const handleChangeDropZone = (files) => {
        files.forEach((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        setFiles(files);
    }; // HANDLE DELETE UPLOAD IMAGE

    const handleFileDelete = (file) => () => {
        setFiles((files) => files.filter((item) => item.name !== file.name));
    };

    return (
        <Card
            sx={{
                p: 6,
            }}
        >
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    label="Name"
                                    color="info"
                                    size="medium"
                                    placeholder="Name"
                                    value={values.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="email"
                                    onBlur={handleBlur}
                                    placeholder="Email"
                                    onChange={handleChange}
                                    value={values.email}
                                    label="Email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            {!edit && <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="password"
                                    onBlur={handleBlur}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    value={values.password}
                                    label="Password"
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                />
                            </Grid>}
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="mobile"
                                    onBlur={handleBlur}
                                    placeholder="Mobile phone"
                                    onChange={handleChange}
                                    value={values.mobile}
                                    label="Mobile phone"
                                    error={!!touched.mobile && !!errors.mobile}
                                    helperText={touched.mobile && errors.mobile}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="role"
                                    onBlur={handleBlur}
                                    placeholder="Role"
                                    onChange={handleChange}
                                    value={values.role}
                                    label="Select Role"
                                    error={!!touched.role && !!errors.role}
                                    helperText={touched.role && errors.role}
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                </TextField>
                            </Grid> <Grid item sm={6} xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    color="info"
                                    size="medium"
                                    name="isBlocked"
                                    onBlur={handleBlur}
                                    placeholder="Block user"
                                    onChange={handleChange}
                                    value={values.isBlocked}
                                    label="Select Status"
                                    error={!!touched.isBlocked && !!errors.isBlocked}
                                    helperText={touched.isBlocked && errors.isBlocked}
                                >
                                    <MenuItem value={true}>Blocked</MenuItem>
                                    <MenuItem value={false}>Active</MenuItem>
                                </TextField>
                            </Grid>

                            {/* <Grid item xs={12}>
                                <DropZone onChange={(files) => handleChangeDropZone(files)} />

                                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                                    {files.map((file, index) => {
                                        return (
                                            <UploadImageBox key={index}>
                                                <Image src={file.preview} width="100%" />
                                                <StyledClear onClick={handleFileDelete(file)} />
                                            </UploadImageBox>
                                        );
                                    })}
                                </FlexBox>
                            </Grid> */}


                            <Grid item sm={6} xs={12}>
                                <Button variant="contained" color="info" type="submit">
                                    Save product
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </Card>
    );
};

export default UserForm;
