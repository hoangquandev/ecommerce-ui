import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/slice/authSlice';
const BASE_URL = 'https://shopdev.onrender.com/api';
// const BASE_URL = 'http://localhost:8000/api';

// const api = axios.create({
//     baseURL: BASE_URL
// });

const api = axios.create({
    baseURL: BASE_URL
});

export const apiPrivate = axios.create({
    baseURL: BASE_URL
});
export const axiosPrivate = axios.create({
    baseURL: BASE_URL
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry && store.getState().auth.user.refreshToken) {
            originalRequest._retry = true
            try {
                const response = await getNewAccessToken(store.getState().auth.user.refreshToken)
                store.dispatch(refreshToken(response.data.newAccessToken))
                return api(originalRequest)
            } catch (error) {
                // handle resfresh error, logout user
                // const response = await api.get('/logout')
                store.dispatch(logout())
            }
        }
        return Promise.reject(error)
    }
)

export default api


// export default api

