import axiosInstance from "./axiosInstance.jsx";

export const getStudents = async () => {
  try {
    const response = await axiosInstance.get("/users/get-students");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const getOrderDetailsApi = async (values) => {
  try {
    const payload = {
      customerId: values,
    };
    const response = await axiosInstance.post(
      "/users/get-order-details",
      payload
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const getDeleteStudentDetailsApi = async (values) => {
  try {
    const payload = {
      studentId: values,
    };
    const response = await axiosInstance.post(
      "/users/get-delete-student-details",
      payload
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};
