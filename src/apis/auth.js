import api from "./axios";


export const getNewAccessToken = (refreshToken) => api.post('/user/refreshtoken', { refreshToken: refreshToken })