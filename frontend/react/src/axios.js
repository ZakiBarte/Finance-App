import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000", // رابط الباك اند
});

export default API;
