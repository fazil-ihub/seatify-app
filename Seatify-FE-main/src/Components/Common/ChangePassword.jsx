/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { Modal } from "antd";
import { useParams } from "react-router-dom";
import { submitChangePassword } from "../../api/authApi";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ChangePassword = ({ visible, title, onCancel, handleSubmitStatus }) => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "newPassword") {
      setNewPassword(value);
    } else if (id === "confirmPassword") {
      setConfirmPassword(value);
    } else if (id === "currentPassword") {
      setCurrentPassword(value);
    }
  };

  const onFinish = async () => {
    if (newPassword === "" && confirmPassword === "") {
      message.warning("Passwords doesn't be empty!");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }
    const userId = localStorage.getItem("userId");
    try {
      const payload = {
        password: newPassword,
        oldPassword: currentPassword,
        token: token,
        userId: userId,
      };

      const response = await submitChangePassword(payload);
      if (response?.data?.isPasswordChanged) {
        message.success("Password Changed successful!");
        navigate("/dashboard", { replace: true });
      } else {
        message.error("something went wrong!");
        navigate("/login", { replace: true });
      }
      handleSubmitStatus();
      setConfirmPassword("");
      setNewPassword("");
      setCurrentPassword("");
    } catch (error) {
      message.error(
        error.message || "Failed to reset password. Please try again."
      );
    }
  };

  return (
    <Modal title={title} visible={visible} footer={false} onCancel={onCancel}>
      <div className="">
        <div className="">
          <div className="flex z-10 flex-col justify-center items-center w-[500px]">
            <div className="mx-auto w-full max-w-md">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block mb-1 text-sm font-medium text-gray-400"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={handleInputChange}
                    className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block mb-1 text-sm font-medium text-gray-400"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={handleInputChange}
                    className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Confirm new password"
                  />
                </div>

                <button
                  className="px-4 py-2 w-full text-white bg-purple-600 rounded-md transition-colors hover:bg-purple-700"
                  onClick={onFinish}
                >
                  Change password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePassword;
