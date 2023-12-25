import useAxiosPrivate from "../hooks/useAxiosPrivate";
import api from "./axios";
import axios, { axiosPrivate } from "./axios";


// const axiosPrivate = useAxiosPrivate()

// export const createProduct = (data) => axiosPrivate.post('/product/', data)

export const getAllCategories = async () => await api.get('/category')
export const updateCategoryById = async (id) => await axiosPrivate.put(`/category/${id}`)