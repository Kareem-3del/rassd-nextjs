import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization' : 'Bearer ' + process.env.ACCESS_TOKEN,
    }
});
export default api;
