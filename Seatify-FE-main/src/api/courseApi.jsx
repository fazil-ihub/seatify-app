import axiosInstance from "./axiosInstance.jsx";

export const getCourses = async () => {
  try {
    const response = await axiosInstance.get("/users/get-courses-list");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};
