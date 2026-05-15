import axios from 'axios';

// We create a custom axios instance. 
export const apiClient = axios.create({
    baseURL: '../../', // Currently serving static JSON files from the root/public folder
    headers: {
        'Content-Type': 'application/json',
    },
});


