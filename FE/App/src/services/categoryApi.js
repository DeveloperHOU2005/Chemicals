import axios from "axios";

const API_URL = 'http://localhost:8080/v1';

export default {
  getAllCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/category`);
      return response.data
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },

  // Thêm danh mục mới


  // Lấy chi tiết một danh mục
  getCategoryById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/admin/category/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      throw error;
    }
    return await response.json();
  },

  updateCategory: async (categoryData) => {
    const res = await axios.patch(
      `${API_URL}/admin/category`,
      categoryData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data.data;
  },
  
  addCategory: async (categoryData) => {
    const res = await axios.post(
      `${API_URL}/admin/category`,
      categoryData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data.data; 
  },
  // Xóa danh mục
  deleteCategory: async (id) => {
    const response = await axios.delete(`${API_URL}/admin/category/${id}`)
    return response.data;
  },

  // Tìm kiếm danh mục
  searchCategories: async (term) => {
    try {
      const response = await axios.get(`${API_URL}/search/find`, {
        params: { term }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching categories:', error);
      throw error;
    }
  },

  // Thống kê tổng quan
  getStatistics: async () => {
    try {
      const response = await axios.get(`${API_URL}/statistics/overview`);
      return response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },

  // Danh mục phổ biến
  getPopularCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/category/statistics/popular`);
      return response.data;
    } catch (error) {
      console.error('Error fetching popular categories:', error);
      throw error;
    }
  },

  // Danh mục trống
  getEmptyCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/statistics/empty`);
      return response.data;
    } catch (error) {
      console.error('Error fetching empty categories:', error);
      throw error;
    }
  },
  // Danh mục mới nhất
  getNewCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/statistics/new`);
      return response.data;
    } catch (error) {
      console.error('Error fetching new categories:', error);
      throw error;
    }
  },
  // Danh mục bán chạy nhất 
  getTopSellingCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/statistics/top-selling`);
      return response.data;
    } catch (error) {
      console.error('Error fetching top selling categories:', error);
      throw error;
    }
  },
  // Danh mục bán chậm nhất
  getLowStockCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/statistics/low-stock`);
      return response.data;
    } catch (error) {
      console.error('Error fetching low stock categories:', error);
      throw error;
    }
  },
  // Danh mục bán chạy nhất theo tháng  
  getTopSellingCategoriesByMonth: async () => {
    try {
      const response = await axios.get(`${API_URL}/statistics/top-selling/month`);
      return response.data;
    } catch (error) {
      console.error('Error fetching top selling categories by month:', error);
      throw error;
    }
  },
  // Danh mục bán chậm nhất theo tháng  
  getLowStockCategoriesByMonth: async () => {
    try {
      const response = await axios.get(`${API_URL}/statistics/low-stock/month`);
      return response.data;
    } catch (error) {
      console.error('Error fetching low stock categories by month:', error);
      throw error;
    }
  },
};
