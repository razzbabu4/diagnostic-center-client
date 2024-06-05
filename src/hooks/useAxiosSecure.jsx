import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    // request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        // console.log('blocked by interceptor', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, (error) => {
        return Promise.reject(error);
    })

    // response intercepts for 401 and 403 status
    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const status = error.response.status;

        // console.log('status code error in interceptors', status);

        // for 401 and 403 logout the user and move the user to the login page
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;