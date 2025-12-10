import React from "react";
import { useAuthStore } from "../../store/authstore.js";
import ResetPasswordComponent from "../../Components/ResetPassword/Index.jsx";

const index = () => {
  const { login, signUp, clearError, google } = useAuthStore();

  const submitLoginApiCall = async (values) => {
    await login(values);
  };

  return (
    <div>
      <ResetPasswordComponent loginApiCall={submitLoginApiCall} />
    </div>
  );
};

export default index;
