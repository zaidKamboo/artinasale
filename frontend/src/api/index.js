import axios from "axios";

const BACKEND_HOST = axios.create({ baseURL: "http://localhost:5000/api" });

export default BACKEND_HOST;
