import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { resetPassword } from "../../api/authApi.jsx";
import * as Yup from "yup";

const ResetPassword = () => {
  const navigate = useNavigate();

  const resetPasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
  });

  const handleResetPassword = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    try {
      // Show success message or redirect
      // alert(
      //   "If an account exists with this email, you will receive password reset instructions."
      // );
      const response = await resetPassword(values?.email);
      if (response) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      setErrors({
        general: "Failed to send reset password email. Please try again.",
      });
    }
    setSubmitting(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(81,45,168,1)] to-[rgba(81,45,168,0)] opacity-70"></div>
      <div
        className={`relative w-[768px] max-w-full min-h-[580px] rounded-[30px] shadow-lg overflow-hidden bg-white`}
        id="container"
      >
        <div
          className={`absolute top-0 left-0 w-1/2 h-full transition-all ease-in-out duration-600`}
        >
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={resetPasswordValidationSchema}
            onSubmit={handleResetPassword}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center justify-center p-[0_40px] h-full bg-white">
                <h1 className="mb-1 text-3xl font-bold">Reset Password</h1>
                <p className="text-gray-600 mb-6 text-center">
                  Enter your email address and we&apos;ll send you instructions
                  to reset your password.
                </p>
                <div className="w-full">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-gray-200 rounded-lg p-[5px_15px] my-2 w-full outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#512da8] text-white text-sm font-semibold uppercase rounded-lg py-2 px-[45px] mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Reset Password"}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Toggle Panel */}
        <div className="absolute top-0 left-1/2 w-1/2 h-full transition-all ease-in-out duration-600 overflow-hidden rounded-l-[150px] z-[1000]">
          <div
            className={`bg-gradient-to-r from-[#512da8] to-[#512da8] h-full w-full absolute top-0 left-0 transition-transform transform`}
          >
            <div
              className={`relative h-full flex flex-col justify-center items-center text-center p-[0_30px]`}
            >
              <h1 className="mb-4 text-4xl font-bold text-white">
                Forget Password?
              </h1>
              <p className="mb-4 text-xl text-white">
                Don&apos;t worry! It happens to the best of us.
              </p>
              <p className="mb-8 text-md text-white">
                We&apos;ll send you a secure link to reset your password and get
                you back on track.
              </p>
              <div className="border-t border-white/30 w-1/2 pt-8 mt-4">
                <p className="text-white text-md flex flex-col items-center">
                  Remember your password?
                  <button
                    className="px-4 py-2 mt-2 text-sm font-semibold text-white uppercase bg-transparent border border-white rounded-lg"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
