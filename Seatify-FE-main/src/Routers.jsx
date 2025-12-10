import { useEffect } from "react";
import fs from "fs";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Login from "../src/Pages/Login/index.jsx";
import ResetPassword from "../src/Pages/ResetPassword/index.jsx";
import "./index.css";
import NotFound from "../src/Pages/NotFound/index.jsx";
import ProtectedRoute from "./Components/Common/ProtectedRoute.jsx";
import Layout from "./Components/Common/Layout.jsx";
import ManageUsers from "./Pages/ManageUser/Index.jsx";
import ManageStudent from "./Pages/ManageStudent/Index.jsx";
import Dashboard from "./Pages/Dashboard/Index.jsx";
import Operations from "./Pages/Operation/Index.jsx";
import ManagePayment from "./Pages/ManagePayment/Index.jsx";
import ManageReport from "./Pages/ManageReport/Index.jsx";
import Course from "./Pages/Course/Index.jsx";

const Routers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const CurrentToken = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // function updateImports(dir) {
  //   fs.readdirSync(dir).forEach((file) => {
  //     const fullPath = path.join(dir, file);
  //     const stat = fs.statSync(fullPath);

  //     if (stat.isDirectory()) {
  //       updateImports(fullPath);
  //     } else if (fullPath.endsWith(".js") || fullPath.endsWith(".jsx")) {
  //       let content = fs.readFileSync(fullPath, "utf8");
  //       const updatedContent = content.replace(
  //         /(import\s.+?from\s+['"])(\.\/[^'"]+)(['"])/g,
  //         (match, p1, p2, p3) => {
  //           const jsxPath = path.resolve(path.dirname(fullPath), p2 + ".jsx");
  //           return fs.existsSync(jsxPath) ? `${p1}${p2}.jsx${p3}` : match;
  //         }
  //       );

  //       if (content !== updatedContent) {
  //         fs.writeFileSync(fullPath, updatedContent, "utf8");
  //         console.log(`Updated imports in: ${fullPath}`);
  //       }
  //     }
  //   });
  // }

  // updateImports("./src");

  useEffect(() => {
    if (
      path.startsWith("/reset-password") ||
      path.startsWith("/reset-new-password")
    ) {
      return;
    }

    if (CurrentToken) {
      if (userRole === "admin") {
        if (path !== "/subscription" && path !== "/profile") {
          navigate("/subscription", { replace: true });
        }
      } else {
        if (path === "/subscription") {
          navigate("/projects", { replace: true });
        }
      }
    } else if (path !== "/login" && path !== "/user-survey/:surveyId") {
      navigate("/login");
    }
  }, [path, CurrentToken, userRole, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                {/* <Route path="/profile" element={<ProfilePage />} /> */}
                <Route path="*" element={<NotFound />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/operation" element={<Operations />} />
                <Route path="/manage-student" element={<ManageStudent />} />
                <Route path="/manage-payment" element={<ManagePayment />} />
                <Route path="/manage-report" element={<ManageReport />} />
                <Route path="/manage-user" element={<ManageUsers />} />
                <Route path="/course" element={<Course />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
