import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({}) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/'); // Điều hướng về trang login sau khi logout
  }, [onLogout, navigate]);

  return null; // Không cần render gì cả
};

export default Logout;