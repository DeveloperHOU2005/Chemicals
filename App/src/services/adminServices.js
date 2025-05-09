import axios from "axios";
import api from "./api";

const KEY = api.API_KEY; 
const URL = api.API_URL + "/admin";

export default {
  // Category management
  getAllCategories: async () => {
    try {
      const response = await axios.get(`${URL}/category`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
  
  getCategoryById: async (id) => {
    try {
      const response = await axios.get(`${URL}/category/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      throw error;
    }
  },

  updateCategory: async (categoryData) => {
    try {
      const res = await axios.patch(
        `${URL}/category`,
        categoryData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },
  
  addCategory: async (categoryData) => {
    try {
      const res = await axios.post(
        `${URL}/category`,
        categoryData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data.data;
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  },
  
  deleteCategory: async (id) => {
    try {
      const response = await axios.delete(`${URL}/category/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },

  searchCategories: async (term) => {
    try {
      const response = await axios.get(`${URL}/category/search/find`, {
        params: { term }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching categories:', error);
      throw error;
    }
  },

  // Statistics and analytics
  getStatistics: async () => {
    try {
      const response = await axios.get(`${URL}/category/statistics/overview`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },

  getPopularCategories: async () => {
    try {
      const response = await axios.get(`${URL}/category/statistics/popular`);
      return response.data;
    } catch (error) {
      console.error('Error fetching popular categories:', error);
      throw error;
    }
  },

  getEmptyCategories: async () => {
    try {
      const response = await axios.get(`${URL}/category/statistics/empty`);
      return response.data;
    } catch (error) {
      console.error('Error fetching empty categories:', error);
      throw error;
    }
  },

  getProductsByCategory: async (categoryId) => {
    try {
      const response = await axios.get(`${URL}/products/category/${categoryId}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },
}