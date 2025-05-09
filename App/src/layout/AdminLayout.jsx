// src/layouts/AdminLayout.js
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AdminSidebar from '../components/Admin/AdminSidebar.jsx';
import AdminDashboardPage from '../page/Admin/AdminDashboardPage.jsx'
import { AdminProvider } from '../context/AdminContext';
import Logout from '../page/Logout.jsx';
import Category from '../page/Admin/Category.jsx';
import Notification from '../components/UI/Nofication.jsx';
// import Detail from '../pages/Admin/Product/Detail.jsx';
function AdminLayout() {
    const account = {}
    const [sider, setSider] = useState('dashboard')
    return (
        <div className="flex-col">
        <AdminProvider siderbarState={sider} account={account} setSiderbarState={setSider} sidebarCollapsed={false}>
        <AdminSidebar />
        <div className="flex-1 p-4">
            <Routes>
            <Route path="/" element={<Navigate to="/admin" />} />
            <Route path="/admin" element = {<AdminDashboardPage />}/>
            <Route path="/admin/customer" element={<AdminDashboardPage />} />
            <Route path="/admin/products" element={<AdminDashboardPage />} />
            <Route path="/admin/orderManagement" element={<AdminDashboardPage />} />
            <Route path="/admin/shipping" element={<AdminDashboardPage />} />
            <Route path="/admin/feedback" element={<AdminDashboardPage />} />
            <Route path="/admin/voucher" element={<AdminDashboardPage />}/>
            <Route path="/admin/category" element={<Category />} />
            <Route path="/admin/inventory" element={<AdminDashboardPage />} />
            <Route path='/admin/products/:productId' element={<AdminDashboardPage />} />
            <Route path='/admin/profile/:id' element={<AdminDashboardPage/>}/>
            <Route path='/admin/all-notifications' element={<AdminDashboardPage/>} />
            <Route path='/logout' element={<Logout/>}/>
            {/* Add other routes here */}
            </Routes>
            <Notification />
        </div>
        </AdminProvider>
        </div>
    );
}

export default AdminLayout;