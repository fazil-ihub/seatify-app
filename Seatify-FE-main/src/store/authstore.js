import { create } from "zustand";
import { loginUser } from "../api/authApi.jsx";

export const useAuthStore = create((set) => ({
  token: null,
  userId: null,
  error: null,

  login: async (loginData) => {
    try {
      const { token, user, status_code } = await loginUser(loginData);

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", user.role);

      let statusVal = false;

      if (status_code === true) {
        statusVal = true;
      }

      const payload = {
        token: token,
        user: user,
        status: statusVal,
      };

      return payload;
    } catch (error) {
      set({ error: error.message || "An error occurred" });
      return { success: false, error: error.message || "An error occurred" };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));
