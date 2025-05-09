import React, { useState ,createContext } from "react";

// Tạo context
export const UserContext = createContext();

// Tạo Provider component
export const AdminProvider = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const value = { 
        collapsed,
        setCollapsed,
        activeMenu,
        setActiveMenu
    };

    return (
        <UserContext.Provider value={value}>
        {children}
        </UserContext.Provider>
    );
};
