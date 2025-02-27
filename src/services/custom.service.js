import axios from 'axios';
import { API_SERVER } from '../../server';


export const axiosInstance = axios.create({
    baseURL: API_SERVER,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosInstanceMultiPart = axios.create({
    baseURL: API_SERVER,
    timeout: 10000,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});