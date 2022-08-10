import { useContext } from 'react';

import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

import { AuthContext } from './../context/AuthContext';

const baseURL = 'http://192.168.1.5:8000/api';

const AxiosDynamic = () => {

    const authContext = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
            'Authorization': `Bearer ${authContext?.authState.authTokens.access}`,
            'Content-Type': 'application/json',
        },
    });

    axiosInstance.interceptors.request.use(async request => {
        const user: any = jwt_decode(authContext?.authState.authTokens.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) {
            return request;
        };

        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
            refresh: authContext?.authState.authTokens.refresh
        });
        await SecureStore.setItemAsync('tokens', JSON.stringify(response.data));
        // reponse data: json object
        authContext?.setAuthState({
            user: jwt_decode(response.data.access),
            authTokens: response.data,
        });

        return request;
    });

    return axiosInstance;
};

export default AxiosDynamic;