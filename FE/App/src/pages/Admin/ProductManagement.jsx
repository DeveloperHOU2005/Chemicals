// src/pages/ProductDashboard.jsx

import { useState, useEffect } from 'react';
import ProductTable from './Product/ProductList.jsx';
import DashboardStats from './Product/DashboardStats.jsx';
import Reviews from './Product/ProductReviews.jsx';
import HistoryComponent from './Product/ProductHistory.jsx';
import Tabs from '../../components/admin/products/Tabs.jsx';
import API from '../../services/productApi.js';
import Header from '../../components/common/admin/Header.jsx';
import Detail from './Product/Detail.jsx'
export default function ProductDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [topSelling, setTopSelling] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addProduct, setAddProduct] = useState(null)

  const [editingProduct, setEditingProduct] = useState(null);


  const [detailProduct, setDetailProduct] = useState(null);
  
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Hàm định dạng tiền tệ cho VNĐ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };


  useEffect(() => {
    // Change notificationBox whenever isSuccess changes
    if (confirmDelete) {
      const timer = setTimeout(() => {
        setConfirmDelete(false);
        setNotificationBox(<></>);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [confirmDelete]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const productsData = await API.fetchProducts();
        setProducts(productsData.data);

        if (activeTab === 'dashboard') {
          const statsData = await API.fetchStats();
          setStats(statsData);

          const topData = statsData.data.topSelling;
          setTopSelling(topData);

          const lowData = statsData.data.lowStock;
          setLowStock(lowData);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [activeTab]);
  useEffect(() => {
    if(showAddModal) {
      setEditingProduct(<ProductForm onCancel={setAddProduct}/>);
    }else{
      setEditingProduct(null);
    }
  }, 
  [showAddModal])
  // Thêm mới
  const handleAddClick = () => {
    setShowAddModal(true);
  };
  const handleAddSubmit = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
    setShowAddModal(false);
  };

  // Chỉnh sửa
  const handleEditClick = (product) => {
    setEditingProduct(product);
  };
  const handleEditSubmit = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
  };

  // Xem chi tiết
  const handleDetailClick = (product) => {
    setDetailProduct(product);
  };
  const handleDetailClose = () => {
    setDetailProduct(null);
  };

  // Xoá
  const handleDelete = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };
  
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-500">Đang tải dữ liệu...</div>
        </div>
      );
    }

    switch (activeTab) {
      case 'products':
        return (
          <ProductTable 
            products={products}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAdd={handleAddClick}
            onEdit={handleEditClick}
            onDetail={handleDetailClick}
            onDelete={handleDelete}
            formatCurrency={formatCurrency}
          />
        );
      case 'dashboard':
        return (
          <DashboardStats 
            stats={stats}
            topSelling={topSelling}
            lowStock={lowStock}
            formatCurrency={formatCurrency}
          />
        );
      case 'reviews':
        return <Reviews />;
      case 'history':
        return <HistoryComponent />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <div className={`flex-grow bg-gray-100 min-h-screen transition-all duration-300 ml-64`}>
        {/* Header */}
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h2>
            <p className="mt-1 text-sm text-gray-500">
              Quản lý danh sách sản phẩm, thống kê và đánh giá
            </p>
          </div>

          {/* Tabs */}
          <Tabs activeTab={activeTab} onTabChange={
            setActiveTab} />

          {/* Content */}
          {renderContent()}
        </div>

    {/* Add Modal */}
        {showAddModal && (
            <ProductForm
            onSubmit={handleAddSubmit}
            onCancel={() => setShowAddModal(false)}
          />
        )}

        {/* Edit Modal */}
        {editingProduct && (
          <ProductForm
            product={editingProduct}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingProduct(null)}
          />
        )}
      </div>
    </div>
  );
}
