// src/layouts/UserLayout.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import Sidebar from '../components/common/user/UserSidebar';
import UserFooter from '../components/common/user/UserFooter'
import HomePage from '../pages/User/HomePage';
import ShoppingCart from '../pages/User/ShopingCart';
import AccountDetailsPage from '../pages/User/AccountDetailsPage'
import NotFound from '../pages/NotFound';
import ProductList from '../pages/User/ProductList'
import ContactPage from '../pages/User/Contact';
import AboutPage from '../pages/User/About';
import SafetyGuidelines from '../pages/User/SafetyGuidelines'
import ChemicalCatalog from '../pages/User/ChemicalCatalog'
import Voucher from '../pages/User/Voucher'
import ScrollToTop from '../hooks/ScrollToTop';
import ProductDetail from '../pages/User/ProductDetailPage';
function UserLayout() {
  return (
    <div className="flex-1">
        <ScrollToTop />
        <Sidebar />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path='/account' element={<AccountDetailsPage />}/>
        <Route path='/find' element={<AccountDetailsPage />}/>
        <Route path='/products' element={<ProductList />} />
        <Route path='/category/:id' element={<ChemicalCatalog />} />
        <Route path='/category' element={<ChemicalCatalog />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/SafetyGuidelines' element={<SafetyGuidelines />} />
        <Route path='/Voucher' element={<Voucher />} />
        <Route path='/products/1' element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
        <UserFooter />
    </div>
  );
}

export default UserLayout;
