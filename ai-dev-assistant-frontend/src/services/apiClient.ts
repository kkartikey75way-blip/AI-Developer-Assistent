import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:4000/api"
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if (token && config.headers) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(
            error.response?.data ?? { message: "Network error" }
        );
    }
);
