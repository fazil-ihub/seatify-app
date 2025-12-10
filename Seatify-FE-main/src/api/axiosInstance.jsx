import axios from "axios";
import { message } from "antd";
import { updateSuperadminVerification } from "../api/otpApi.jsx";

export const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/routes`;
// export const apiUrl = "https://api.seatifyai.com/api/routes";
const user_email = localStorage.getItem("userEmail");
const user_role = localStorage.getItem("userRole");

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

let navigationCallback = () => {
  window.location.href = "/login";
};

export const setNavigationCallback = (callback) => {
  navigationCallback = callback;
};

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
    // config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.status === 200) {
      const { message: successMessage } = response.data;
      if (successMessage) message.success(successMessage);
    } else if (response?.status === 400) {
      const { message: errorMessage } = response.data;
      if (errorMessage) message.error(errorMessage);
    } else if (response?.status === 401) {
      if (user_role === "superadmin") {
        if (user_email) {
          updateSuperadminVerification({ email: user_email });
        }
      }
      localStorage.clear();
      navigationCallback();
      const { message: warningMessage } = response.data;
      if (warningMessage) message.warning(warningMessage);
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      if (user_role === "superadmin") {
        if (user_email) {
          updateSuperadminVerification({ email: user_email });
        }
      }
      localStorage.clear();
      navigationCallback();
      const { message: errorMessage } = error.response.data;
      if (errorMessage) message.error(errorMessage);
      return error?.response;
    } else if (error?.response?.status === 500) {
      const { message: errorMessage } = error.response.data;
      if (errorMessage) message.error(errorMessage);
      return error?.response;
    } else if (error?.response?.data != null) {
      const { message: errorMessage } = error.response.data;
      if (errorMessage) message.error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
