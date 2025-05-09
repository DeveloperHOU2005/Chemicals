// src/api/productApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/v1';

// Lấy tất cả sản phẩm
const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/products/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Thêm sản phẩm mới
const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/product`, productData);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Cập nhật sản phẩm
const updateProduct = async (productData) => {
  try {
    const response = await axios.patch(`${API_URL}/edit-product`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Xóa sản phẩm
const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-product`, { 
      data: { id: productId } 
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Lấy thống kê tổng quan
const fetchStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/product-statistics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

// Lấy top sản phẩm bán chạy
const fetchTopSelling = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats/top-selling`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top selling products:', error);
    throw error;
  }
};

// Lấy sản phẩm sắp hết hàng
const fetchLowStock = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats/low-stock`);
    return response.data;
  } catch (error) {
    console.error('Error fetching low stock products:', error);
    throw error;
  }
};

// Đánh giá sản phẩm
const rateProduct = async (ratingData) => {
  try {
    // const response = await axios.post(`${API_URL}/rate-product`, ratingData);
    // return response.data;
    const reviews = [
      {
        review_id: 1,
        user_id: 101,
        product_id: 1,
        order_id: 1001,
        rating: 5,
        title: "Tuyệt vời",
        comment: "Sản phẩm rất tốt, giao hàng nhanh",
        is_anonymous: false,
        seller_service_rating: 5,
        delivery_speed_rating: 5,
        delivery_person_rating: 5,
        verified_purchase: true,
        created_at: "2025-04-11T10:00:00Z",
        updated_at: "2025-04-11T10:00:00Z",
        // Danh sách các thẻ liên quan đến bài đánh giá
        tags: [
          {
            tag_id: 1,
            name: "Giao hàng nhanh",
            description: "Giao hàng nhanh chóng và đúng hạn"
          },
          {
            tag_id: 2,
            name: "Chất lượng sản phẩm",
            description: "Đánh giá về chất lượng sản phẩm"
          }
        ],
        // Danh sách các media (hình ảnh/video) đính kèm bài đánh giá
        media: [
          {
            media_id: 1,
            media_type: "image",
            url: "http://example.com/media/review1.jpg",
            thumbnail_url: "http://example.com/media/review1_thumb.jpg",
            created_at: "2025-04-11T10:05:00Z"
          }
        ],
        // Thông tin điểm thưởng cho bài đánh giá
        reward_points: {
          reward_id: 1,
          user_id: 101,
          points: 10,
          reason: "Review chất lượng cao",
          created_at: "2025-04-11T10:10:00Z"
        },
        // Các lượt đánh giá hữu ích của người dùng khác
        votes: [
          {
            vote_id: 1,
            user_id: 102,
            is_helpful: true,
            created_at: "2025-04-11T10:15:00Z"
          },
          {
            vote_id: 2,
            user_id: 103,
            is_helpful: false,
            created_at: "2025-04-11T10:16:00Z"
          }
        ]
      },
      {
        review_id: 2,
        user_id: 102,
        product_id: 2,
        order_id: 1002,
        rating: 4,
        title: "Hài lòng",
        comment: "Đáp ứng nhu cầu nhưng cần cải thiện về chất lượng",
        is_anonymous: false,
        seller_service_rating: 4,
        delivery_speed_rating: 4,
        delivery_person_rating: 4,
        verified_purchase: true,
        created_at: "2025-04-12T11:00:00Z",
        updated_at: "2025-04-12T11:00:00Z",
        tags: [
          {
            tag_id: 2,
            name: "Chất lượng sản phẩm",
            description: "Đánh giá về chất lượng sản phẩm"
          }
        ],
        media: [
          {
            media_id: 2,
            media_type: "video",
            url: "http://example.com/media/review2.mp4",
            thumbnail_url: "http://example.com/media/review2_thumb.jpg",
            created_at: "2025-04-12T11:05:00Z"
          }
        ],
        reward_points: {
          reward_id: 2,
          user_id: 102,
          points: 5,
          reason: "Review trung bình",
          created_at: "2025-04-12T11:10:00Z"
        },
        votes: [
          {
            vote_id: 3,
            user_id: 101,
            is_helpful: true,
            created_at: "2025-04-12T11:15:00Z"
          }
        ]
      },
      {
        review_id: 3,
        user_id: 103,
        product_id: 3,
        order_id: 1003,
        rating: 2,
        title: "Không hài lòng",
        comment: "Chất lượng không như mong đợi, cần cải tiến",
        is_anonymous: true,
        seller_service_rating: 2,
        delivery_speed_rating: 3,
        delivery_person_rating: 2,
        verified_purchase: false,
        created_at: "2025-04-13T12:00:00Z",
        updated_at: "2025-04-13T12:00:00Z",
        tags: [
          {
            tag_id: 3,
            name: "Đóng gói đẹp",
            description: "Sản phẩm được đóng gói cẩn thận, đẹp mắt"
          }
        ],
        media: [], // Bài đánh giá không có media đính kèm
        reward_points: {
          reward_id: 3,
          user_id: 103,
          points: 0,
          reason: "Review chưa đạt chuẩn",
          created_at: "2025-04-13T12:05:00Z"
        },
        votes: [
          {
            vote_id: 4,
            user_id: 101,
            is_helpful: false,
            created_at: "2025-04-13T12:10:00Z"
          }
        ]
      }
    ];
    
    // Ví dụ in ra console
    console.log(reviews);
    
  } catch (error) {
    console.error('Error rating product:', error);
    throw error;
  }
};

// Lấy đánh giá của sản phẩm
const getProductReviews = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/product/${productId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    throw error;
  }
};

// Lấy lịch sử thay đổi sản phẩm
const getProductHistory = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/audit/product-history/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product history:', error);
    throw error;
  }
};

// Lấy sản phẩm theo danh mục
const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/admin/products/category/${categoryId}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// Lọc sản phẩm
const filterProducts = async (filterParams) => {
  try {
    const response = await axios.get(`${API_URL}/filter`, { params: filterParams });
    return response.data;
  } catch (error) {
    console.error('Error filtering products:', error);
    throw error;
  }
};

// Tìm kiếm sản phẩm
const searchProducts = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_URL}/find-product`, { 
      params: { keyword: searchTerm } 
    });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Lấy sản phẩm nổi bật
const getTrendingProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/product/trending`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending products:', error);
    throw error;
  }
};

// Lấy sản phẩm gợi ý
const getRecommendations = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/product/`, {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product recommendations:', error);
    throw error;
  }
};

  
export default {
    fetchProducts,
    addProduct, 
    updateProduct,
    deleteProduct,
    fetchStats,
    fetchTopSelling,
    fetchLowStock,
    rateProduct,
    getProductReviews,
    getProductHistory,
    getProductsByCategory,
    filterProducts,
    searchProducts,
    getTrendingProducts,
    getRecommendations
}
