import axios from "axios";

let authDispatch = null;

export const setAuthDispatch = (dispatch) => {
  authDispatch = dispatch;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401) {
      authDispatch?.({ type: "auth/logout" });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("verifyEmail");
      window.location.href = "/login";
    }

    const accountSuspended =
      status === 403 && message && message.toLowerCase().includes("suspended");

    if (accountSuspended) {
      authDispatch?.({ type: "auth/logout" });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("verifyEmail");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
