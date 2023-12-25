import { axiosPrivate } from "./axios";


export const getAllUsers = async () => await axiosPrivate.get('/user')