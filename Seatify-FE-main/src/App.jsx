import { BrowserRouter, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme";
import Routers from "./Routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { setNavigationCallback } from "../src/api/axiosInstance";

// Create a new NavigationSetup component
const NavigationSetup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigationCallback(() => navigate("/login"));
  }, [navigate]);

  return <Routers />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer />
        <NavigationSetup />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
