import axios from 'axios';
console.log(process.env.REACT_APP_BASE_URL)
export const axiosi = axios.create({
    withCredentials: true, 
    baseURL: process.env.REACT_APP_BASE_URL,
});
