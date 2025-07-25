import axios from "axios";

const BACKEND_HOST = axios.create({ baseURL: "http://localhost:5000/api" });
// const BACKEND_HOST = axios.create({
//   baseURL: "https://artinasale.onrender.com",
// });

export default BACKEND_HOST;
