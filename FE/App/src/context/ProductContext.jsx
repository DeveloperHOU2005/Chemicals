import React, { createContext } from "react";

// Tạo context
export const UserContext = createContext();

// Tạo Provider component
export const ProductProvider = ({ siderbarState, account, setSiderbarState, children }) => {
  const value = { siderbarState, setSiderbarState, account };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
