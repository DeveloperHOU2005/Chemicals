import React, {useState} from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/AdminContext.jsx';
const AdminDashboardPage = () => {
    const { collapsed } = useContext(UserContext);
    return (
        <div className={`flex flex-col  h-screen ${collapsed ? "ml-24" : "ml-64"} `}>
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-lg">Welcome to the Admin Dashboard!</p>
        </div>
    );
}

export default AdminDashboardPage;