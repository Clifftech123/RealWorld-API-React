import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.realworld.io/api',
  headers: {
    'Content-type': 'application/json',
    Accept: 'Application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});



export default API;