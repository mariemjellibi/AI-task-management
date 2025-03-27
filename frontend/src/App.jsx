import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./ErrorBoundary";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route element={<ProtectedRoute />}>
          {/* Wrap AdminPage with ErrorBoundary */}
          <Route 
            path="/AdminPage" 
            element={
              <ErrorBoundary>
                <AdminPage />
              </ErrorBoundary>
            } 
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
