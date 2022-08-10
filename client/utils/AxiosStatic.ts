import axios from 'axios';

const baseURL = 'http://192.168.1.5:8000/api';

const axiosStatic = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosStatic;