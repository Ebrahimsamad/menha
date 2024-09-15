import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PageNotFound from "./pages/404";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import CheckTokenPage from "./pages/CheckTokenPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ui/ProtectedRoute";
import Layout from "./layout/Layout";
import BrowseScholarship from "./features/dashboard/BrowseScholarship";

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute>
                  <SignupPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forget-password"
              element={
                <ProtectedRoute>
                  <ForgetPasswordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/check-reset-password-token"
              element={
                <ProtectedRoute>
                  <CheckTokenPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRoute>
                  <ResetPasswordPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
