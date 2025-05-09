// src/layouts/AdminLayout.js
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AdminSidebar from '../components/common/admin/Sidebar';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import ProductManage from '../pages/Admin/ProductManagement';
import CustomerPage from '../pages/Admin/Customer';
import OrderManagementDashboard from '../pages/Admin/OrderManagementDashboard';
import ShippingManagementDashboard from '../pages/Admin/ShippingManagementDashboard';
import ShippingSettingsPage from '../pages/Admin/ShippingSettingsPage';
import AccountAdminDashboard from '../pages/Admin/AccountAdminDashboard';
import FeedbackPage from '../pages/Admin/FeedbackPage';
import VoucherManagement from '../pages/Admin/VoucherManagement';
import CategoriesPage from '../pages/Admin/CategoriesPage';
import Inventory from '../pages/Admin/Inventory'
import ChemicalProductManagement from '../pages/Admin/ChemicalProductManagement';
import UserReportsDashboard from '../pages/Admin/UserReportsDashboard';
import { AdminProvider } from '../context/AdminContext';
import Detail from '../pages/Admin/Product/Detail.jsx';
function AdminLayout() {
  const account = {}
  const [sider, setSider] = useState('dashboard')
  return (
    <div className="flex">
      <AdminProvider siderbarState={sider} account={account} setSiderbarState={setSider} sidebarCollapsed={false}>
      <AdminSidebar />
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/products" element={<ProductManage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/orderManagement" element={<OrderManagementDashboard />} />
          <Route path="/shippingManagement" element={<ShippingManagementDashboard />} />
          <Route path="/voucher" element={<VoucherManagement />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/account" element={<AccountAdminDashboard />} />
          <Route path="/settings" element={<ShippingSettingsPage />} />
          <Route path="/category" element={<CategoriesPage />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/admin/reports/sales" element={<ChemicalProductManagement />} />
          <Route path="/admin/reports/products" element={<generateSampleData />} />
          <Route path="/admin/reports/customers" element={<UserReportsDashboard />} />
          <Route path="/admin/products/details/:productId" element={<Detail />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
      </AdminProvider>
    </div>
  );
}

export default AdminLayout;