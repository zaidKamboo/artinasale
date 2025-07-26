import axios from "axios";
let isLive = true;
const BACKEND_HOST = axios.create({
  baseURL: isLive
    ? "https://artinasale.onrender.com/api"
    : "http://localhost:5000/api",
});
export default BACKEND_HOST;
