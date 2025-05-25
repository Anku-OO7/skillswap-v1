import axios from 'axios';

// const instance = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     withCredentials: false,
// });

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://skillswap-backend-om1g.onrender.com/api',
    withCredentials: false,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;