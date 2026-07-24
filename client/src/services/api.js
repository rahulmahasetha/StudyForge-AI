import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Hardcoded for local dev, will be environment variable in production
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout to prevent hanging UI
});

export default api;
