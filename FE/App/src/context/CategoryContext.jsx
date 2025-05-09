// userContext.jsx
import React, { createContext } from "react";

// Tạo một context ngoài component
const UserContext = createContext();

// Provider component nhận các prop từ bên ngoài (như isLogin và account)
// và truyền chúng qua value của context cho các component con.
const Category = ({ isLogin, account, children }) => {
  const value = { isLogin, account };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default {
    Category,  // Provider component
    UserContext, // Context để các component con có thể truy cập qua useContext(UserContext)
};
