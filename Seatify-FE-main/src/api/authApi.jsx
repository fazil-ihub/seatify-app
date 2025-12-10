import axiosInstance from "./axiosInstance.jsx";

// Existing loginUser function
export const loginUser = async (loginData) => {
  try {
    const response = await axiosInstance.post("/users/user-login", loginData);
    return {
      token: response?.data?.data?.token,
      user: {
        email: response?.data?.data?.email,
        id: response?.data?.data?.user_id,
        username: response?.data?.data?.username,
        role: response?.data?.data?.role,
      },
      status_code: response?.data?.data?.status_code,
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const logoutUser = async (userId) => {
  try {
    const response = await axiosInstance.post("/user/logout", {
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const submitChangePassword = async (updateData) => {
  try {
    const response = await axiosInstance.post(
      `/user/change-password`,
      updateData
    );
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const resetPassword = async (userId) => {
  try {
    const response = await axiosInstance.put(`/user/reset-password/${userId}`);
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};


export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/users/get-users");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};
