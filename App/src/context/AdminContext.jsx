import React, { useState, createContext, useEffect } from "react";

// Tạo context
export const UserContext = createContext();

// Tạo Provider component
export const AdminProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('/');
  const [nofiticals, setNofiticals] = useState([]);
  const [nofiticalState, setNofiticalState] = useState(false);
  const [detailNofitical, setDetailNofitical] = useState(false);
  const [detailAccount, setDetailAccount] = useState(false);
  const [account, setAccount] = useState({
    id: 1,
    avatar: "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg",
    UserName: "Admin",
    Role: "Quản trị viên"
  });

  // Update notification state whenever notification count changes
  useEffect(() => {
    setNofiticalState(nofiticals.length > 0 && nofiticals.filter(item => !item.read).length > 0);
  }, [nofiticals]);


  const value = {
    collapsed,
    setCollapsed,
    activeMenu,
    setActiveMenu,
    nofiticals,
    setNofiticals,
    nofiticalState,
    setNofiticalState,
    account,
    setAccount,
    detailNofitical,
    setDetailNofitical,
    detailAccount,
    setDetailAccount,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default AdminProvider;