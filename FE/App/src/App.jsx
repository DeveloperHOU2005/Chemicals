import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import AdminLayout from './layout/AdminLayout';
import UserLayout from './layout/UserLayout.jsx';
import { useAuth } from './hooks/useAuth'; // Import custom hook

function App() {
  // Lấy thông tin xác thực từ hook
  // const { isAuthenticated, userRole, userAccount, isLoading } = useAuth();
  // // Nếu đang tải (isLoading), có thể hiển thị một loading indicator
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // Protected route component
  // const ProtectedRoute = ({ children, allowedRoles }) => {
  //   if (!isAuthenticated) {
  //     return <Navigate to="/login" replace />;
  //   }
  //   // Nếu allowedRoles được cung cấp và userRole không nằm trong danh sách
  //   if (allowedRoles && !allowedRoles.includes(userRole)) {
  //     return <Navigate to="/" replace />;
  //   }
  //   return children;
  // };

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
            <AdminLayout/>
        }
      />

      {/* User routes */}
      <Route
        path="/*"
        element={
            <UserLayout />
        }
      />

      {/* Not found route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
