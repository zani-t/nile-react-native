import { useContext } from 'react';

import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

import { AuthContext } from './../context/AuthContext';

const baseURL = 'http://192.168.1.5:8000/api';

const AxiosDynamic = () => {

    const authContext = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers:{
            'Authorization': `Bearer ${authContext?.authState.authTokens.access}`,
            'Content-Type': 'application/json',
        },
    });

    return axiosInstance;
};

export default AxiosDynamic;