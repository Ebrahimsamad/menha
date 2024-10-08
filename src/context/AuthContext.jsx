import { createContext, useContext, useState, useEffect } from "react";
import {
  login as loginService,
  signup as signupService,
  logout as logoutService,
  forgetPassword as forgetPasswordService,
  resetPassword as resetPasswordService,
  checkResetPasswordToken as checkResetPasswordTokenService,
} from "../services/AuthService";
import { toast } from "react-hot-toast";
import { UserContext } from "./UserContext";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);


  useEffect(() => {
    if (token) {
      const storedUser = user;
      if (storedUser) {
        setUser(storedUser);
      }
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const promise = loginService(email, password);

      toast.promise(promise, {
        loading: "Logging in...",
        success: "Logged in successfully!",
        error: "Login failed! Please check your email or password.",
      });

      const data = await promise;

      if (data && data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);

        return data.user;
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      console.error("Login error: ", error);

      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      const promise = signupService(userData);
      toast.promise(promise, {
        loading: "Signing up...",
        success: "Signup successful!",
        error: (error) =>
          error.message === "Email already exists"
            ? "Email already exists, please use a different email."
            : "Signup failed!",
      });

      const data = await promise;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Signup error: ", error);
      throw error;
    }
  };

  const forgetPassword = async (email) => {
    try {
      const promise = forgetPasswordService(email);
      toast.promise(promise, {
        loading: "Sending reset email...",
        success: "Password reset email sent!",
        error: (error) =>
          error.message === "User not found."
            ? "User with this email does not exist."
            : "Failed to send reset email.",
      });

      await promise;
    } catch (error) {
      console.error("Forget Password error: ", error);
      throw error;
    }
  };

  const checkResetPasswordToken = async (email, token) => {
    try {
      const promise = checkResetPasswordTokenService(email, token);
      toast.promise(promise, {
        loading: "Verifying token...",
        success: "Token verified successfully!",
        error: "Invalid or expired token. Please check your email again.",
      });

      await promise;
    } catch (error) {
      console.error("Token verification error: ", error);
      throw error;
    }
  };

  const resetPassword = async (token, email, newPassword, confirmPassword) => {
    setLoading(true);
    try {
      const promise = resetPasswordService(
        token,
        email,
        newPassword,
        confirmPassword
      );
      toast.promise(promise, {
        loading: "Resetting password...",
        success: "Password reset successfully!",
        error: (error) => {
          return error.message.includes("not found")
            ? "User not found or reset token is invalid or expired."
            : "Failed to reset password.";
        },
      });

      await promise;
    } catch (error) {
      console.error("Reset Password error: ", error);
      toast.error("Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutService();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("savedScholarships");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        forgetPassword,
        resetPassword,
        checkResetPasswordToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
