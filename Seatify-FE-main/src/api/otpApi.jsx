import axiosInstance from "./axiosInstance.jsx"; 


export const generateAndSendOTP = async (email) => {

  try {
    const response = await axiosInstance.post("/otp/generate", { email });
    return response.data;
  } catch (error) {
    throw new Error("Error generating OTP: " + error.message);
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await axiosInstance.post("/otp/verify-otp", { email, otp });
    return response.data;
  } catch (error) {
    throw new Error("Error verifying OTP: " + error.message);
  }
};

export const updateSuperadminVerification = async (email) => {
  try {
    const response = await axiosInstance.post("/otp/update-superadmin-verification", { email });
    return response.data;
  } catch (error) {
    throw new Error("Error updating OTP: " + error.message);
  }
};