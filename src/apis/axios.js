import axios from 'axios';
const BASE_URL = 'https://shopdev.onrender.com/api';
// const BASE_URL = 'http://localhost:8000/api';

// const api = axios.create({
//     baseURL: BASE_URL
// });

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    // withCredentials: true
});



// export default api

