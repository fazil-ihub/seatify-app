import axiosInstance from "./axiosInstance.jsx";

export const getDashboardInfo = async () => {
  try {
    const response = await axiosInstance.get("/users/get-dashboard-list");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};
