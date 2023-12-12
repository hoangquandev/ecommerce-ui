
import { useEffect } from "react";
import { axiosPrivate } from "../apis/axios";
import { useDispatch, useSelector } from "react-redux";
import { getNewAccessToken } from "../apis/auth";
import { logout, refreshToken } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
// import { refreshToken } from "../redux/slice/authSlice";

const useAxiosPrivate = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        // api.interceptors.request.use(
        //     (config) => {
        //         const token = auth.token
        //         if (token) {
        //             config.headers.Authorization = `Bearer ${token}`;
        //         }
        //         return config;
        //     },
        //     (error) => Promise.reject(error)
        // );

        // // Add a response interceptor
        // api.interceptors.response.use(
        //     (response) => response,
        //     async (error) => {
        //         const originalRequest = error.config;

        //         // If the error status is 401 and there is no originalRequest._retry flag,
        //         // it means the token has expired and we need to refresh it
        //         if (error.response.status === 401 && !originalRequest._retry) {
        //             originalRequest._retry = true;

        //             try {
        //                 const token = auth.user?.refreshToken
        //                 const response = await getNewAccessToken(token)
        //                 const { newAccessToken } = response.data;
        //                 console.log(newAccessToken);

        //                 // localStorage.setItem('token', token);
        //                 dispatch(refreshToken(newAccessToken))

        //                 // Retry the original request with the new token
        //                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        //                 return api(originalRequest);
        //             } catch (error) {
        //                 // Handle refresh token error or redirect to login
        //             }
        //         }

        //         return Promise.reject(error);
        //     }
        // );

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );



        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    try {
                        const res = await getNewAccessToken(auth.user?.refreshToken)
                        // if(!res.data.success)
                        dispatch(refreshToken(res.data.newAccessToken))
                        prevRequest.headers['Authorization'] = `Bearer ${res.data.newAccessToken}`;
                        return axiosPrivate(prevRequest);
                    } catch (error) {
                        dispatch(logout())
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth.token])

    return axiosPrivate;
}

export default useAxiosPrivate;