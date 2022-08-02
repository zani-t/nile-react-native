import React, { useContext, useState } from "react";

import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

import { AuthContext } from './AuthContext';

const baseURL = 'http://192.168.1.5:8000/api'

export const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const useAxios = () => {

};