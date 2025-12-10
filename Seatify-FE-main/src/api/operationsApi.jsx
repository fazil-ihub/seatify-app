import axiosInstance from "./axiosInstance.jsx";

export const getOperationsDetailsApi = async () => {
  try {
    const response = await axiosInstance.get("/users/get-operations");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const getCourseDetailsApi = async () => {
  try {
    const response = await axiosInstance.get("/users/get-courses-list");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const updateStatusApi = async (userId, newStatus) => {
  try {
    const payload = {
      userId: userId,
      newStatus: newStatus,
    };
    const response = await axiosInstance.post(
      "/users/update-status-details",
      payload
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const updateDocsStatusApi = async (values) => {
  try {
    const response = await axiosInstance.post(
      "/users/update-document-status",
      values
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};
