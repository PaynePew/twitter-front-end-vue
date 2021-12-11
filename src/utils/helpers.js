import axios from "axios";
import io from "socket.io-client";

// const baseURL = "https://ac3-twitter-api.herokuapp.com/api";
// const baseURL = "https://ac3-twitter-api-jen.herokuapp.com/api";
const baseURL = "http://localhost:3000/api";
const socketURL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const apiHelper = axiosInstance;

export const socket = io(socketURL);
