import { useState, useEffect } from 'react';

export function useAuth() {
  // Khởi tạo trạng thái xác thực
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    userAccount: null,
    isLoading: true
  });

  useEffect(() => {
    // Giả lập kiểm tra trạng thái xác thực (ví dụ: từ localStorage)
    const checkAuth = () => {
      // Lấy token và vai trò từ localStorage (giả sử đã được lưu khi đăng nhập)
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole');
      const username = localStorage.getItem('username');
      
      if (token && role) {
        setAuthState({
          isAuthenticated: true,
          userRole: role,            // Role có thể là 'admin' hoặc 'user'
          userAccount: { id: 'dummyId', name: username || 'Dummy User' },
          isLoading: false
        });
      } else {
        setAuthState({
          isAuthenticated: true,
          userRole: 'user',
          userAccount: {},
          isLoading: false
        });
      }
    };

    // Giả lập kiểm tra sau một khoảng delay ngắn (500ms)
    setTimeout(checkAuth, 500);
  }, []);

  // Hàm đăng nhập giả lập
  const login = async ({ username, password, role }) => {
    // Kiểm tra đơn giản: nếu có username, password và role hợp lệ thì cho phép đăng nhập
    if (username && password && (role === 'admin' || role === 'user')) {
      // Lưu thông tin xác thực vào localStorage
      localStorage.setItem('authToken', 'dummyToken');
      localStorage.setItem('userRole', role);
      localStorage.setItem('username', username);

      // Cập nhật authState
      setAuthState({
        isAuthenticated: true,
        userRole: role,
        userAccount: { id: 'dummyId', name: username },
        isLoading: false
      });
      return true;
    }
    return false;
  };

  // Hàm đăng xuất giả lập
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    setAuthState({
      isAuthenticated: false,
      userRole: null,
      userAccount: null,
      isLoading: false
    });
  };

  return { ...authState, login, logout };
}
