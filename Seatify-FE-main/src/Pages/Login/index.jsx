import React from "react";
import { useAuthStore } from "../../store/authstore.js";
import LoginComponent from "../../Components/Login/index.jsx";

const index = () => {
  const { login, signUp, clearError, google } = useAuthStore();

  const submitLoginApiCall = async (values) => {
    const response = await login(values);
    return response;
  };

  return (
    <div>
      <LoginComponent loginApiCall={submitLoginApiCall} />
    </div>
  );
};

export default index;
