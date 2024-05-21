import { Route, Routes } from "react-router-dom";
import AlertPopup from "./components/AlertPopup";
import { ProtectedRoute } from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import Logout from "./pages/Logout";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { EPaths } from "./utils/types";

function App() {
  return (
    <>
      <AlertPopup />
      <Routes>
        <Route path={EPaths.LOGIN} element={<LoginPage />} />
        <Route path={EPaths.REGISTER} element={<RegisterPage />} />
        <Route path={EPaths.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route path={EPaths.LOGOUT} element={<Logout />} />
        <Route
          path={EPaths.DASHBOARD}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
