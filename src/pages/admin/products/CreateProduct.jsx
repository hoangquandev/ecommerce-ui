import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "../../../components/Typography";
import ProductForm from "../../../pages-sections/admin/products/ProductForm/ProductForm";
// import { createProduct } from "../../../apis/product";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { axiosPrivate } from "../../../apis/axios";
// import api from "../../../apis/axios";
// import axios from "axios";

export default function CreateProduct() {
    // const auth = useSelector(state => console.log(state.auth.token))
    const INITIAL_VALUES = {
        name: "",
        brand: "",
        stock: "",
        price: "",
        category: "",
        regular_price: "",
        description: "",
    };
    const validationSchema = yup.object().shape({
        name: yup.string().required("required"),
        category: yup.string().required("required"),
        description: yup.string().required("required"),
        stock: yup.number().required("required"),
        price: yup.number().required("required"),
        regular_price: yup.number().required("required"),
        brand: yup.string().required("required"),
    });
    // const axiosPrivate = useAxiosPrivate()
    const handleFormSubmit = async (values) => {
        // console.log(values);
        // const res = await createProduct(values)
        const res = await axiosPrivate.post('/product', values)
        console.log(res);
    };

    return (
        <Box py={4}>
            <H3 mb={2}>Add New Product</H3>

            <ProductForm
                initialValues={INITIAL_VALUES}
                validationSchema={validationSchema}
                handleFormSubmit={handleFormSubmit}
            />
        </Box>
    );
}
