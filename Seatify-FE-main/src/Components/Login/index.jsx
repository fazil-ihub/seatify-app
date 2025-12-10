import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignUpPage = ({ loginApiCall }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    const result = await loginApiCall(values);
    setSubmitting(false);
    if (result) {
      const userRole = localStorage.getItem("userRole");
      if (userRole === "superadmin") {
        navigate("/dashboard", { replace: true });
      } else if (userRole === "admin") {
        navigate("/manage-students", { replace: true });
      }
    } else {
      setErrors({ general: result?.error || "Login failed" });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(81,45,168,1)] to-[rgba(81,45,168,0)] opacity-70"></div>
      <div
        className={`relative w-[768px] max-w-full min-h-[580px] rounded-[30px] shadow-lg overflow-hidden bg-white ${
          isSignUp ? "" : "active"
        }`}
        id="container"
      >
        <div
          className={`absolute top-0 left-0 w-1/2 h-full transition-all ease-in-out duration-600 ${
            isSignUp
              ? "opacity-0 z-[1] transform translate-x-full"
              : "opacity-1 z-[5]"
          }`}
        >
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, errors }) => (
              <Form className="flex flex-col items-center justify-center p-[0_40px] h-full bg-white">
                <div className="my-2" style={{ width: "220px" }}>
                  <img src="logo-transparent.png" />
                  {/* <a
                    href="#"
                    className="flex items-center justify-center bg-cover rounded-full"
                    style={{
                      width: "200px !important",
                      backgroundImage:
                        "url('https://educom.snsiqac.org/wp-content/uploads/2024/09/SNS-DT-Logo.png')",
                    }}
                  ></a> */}
                </div>
                <h1 className="mb-6 text-4xl font-bold">Login</h1>
                <div className="w-full">
                  <Field
                    type="email"
                    name="username"
                    placeholder="Email"
                    className="bg-gray-200 rounded-lg p-[10px_15px] my-2 w-full outline-none"
                  />
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="w-full">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-200 rounded-lg p-[10px_15px] my-2 w-full outline-none"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500"
                  />
                  <div className="flex justify-end">
                    <p
                      onClick={() => navigate("/reset-password")}
                      className="text-md my-3 text-[#512da8] hover:underline hover:cursor-pointer"
                    >
                      Forgot Password?
                    </p>
                  </div>
                </div>
                {errors.general && (
                  <p className="mt-4 mb-4 text-red-500">{errors.general}</p>
                )}
                <button
                  type="submit"
                  className="bg-[#512da8] text-white text-sm font-semibold uppercase rounded-lg py-2 px-[45px] mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Sign In"}
                </button>{" "}
              </Form>
            )}
          </Formik>
        </div>

        {/* Toggle Panel */}
        <div className="absolute top-0 left-1/2 w-1/2 h-full transition-all ease-in-out duration-600 overflow-hidden rounded-l-[150px] z-[1000]">
          <div
            className={`bg-gradient-to-r from-[#512da8] to-[#512da8] h-full w-[200%] absolute left-[-100%] transition-transform transform ${
              isSignUp ? "translate-x-0" : "translate-x-[50%]"
            }`}
          >
            <div
              className={`absolute top-0 w-1/2 h-full flex flex-col justify-center items-center text-center p-[0_30px] transition-all duration-600 transform ${
                isSignUp ? "translate-x-[-200%]" : "translate-x-0"
              }`}
            >
              <h1 className="mb-4 text-4xl font-bold text-white">
                Welcome Back!
              </h1>
              <p className="mb-8 text-xl text-white">
                Please login to continue
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
