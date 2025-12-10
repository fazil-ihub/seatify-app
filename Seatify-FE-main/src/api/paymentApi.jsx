import axiosInstance from "./axiosInstance.jsx";

export const getPaymentsList = async () => {
  try {
    const response = await axiosInstance.get("/users/get-payment-list");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};