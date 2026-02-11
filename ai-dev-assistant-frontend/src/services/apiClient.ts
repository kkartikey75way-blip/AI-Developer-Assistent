import axios from "axios";

interface RefreshResponse {
    accessToken: string;
}

interface ErrorResponse {
    message: string;
}

export const apiClient = axios.create({
    baseURL: "http://localhost:4000/api"
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

const processQueue = (): void => {
    pendingRequests.forEach((callback) => callback());
    pendingRequests = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    pendingRequests.push(() => {
                        resolve(apiClient(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken =
                    localStorage.getItem("refresh_token");

                if (!refreshToken) {
                    throw new Error("No refresh token");
                }

                const response = await axios.post<RefreshResponse>(
                    "http://localhost:4000/api/auth/refresh",
                    { refreshToken }
                );

                const newAccessToken = response.data.accessToken;

                localStorage.setItem(
                    "access_token",
                    newAccessToken
                );

                isRefreshing = false;
                processQueue();

                originalRequest.headers =
                    originalRequest.headers ?? {};

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return apiClient(originalRequest);
            } catch {
                isRefreshing = false;
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
            }
        }

        const response = error.response as
            | { data?: ErrorResponse }
            | undefined;

        return Promise.reject(
            response?.data ?? { message: "Network error" }
        );
    }
);
