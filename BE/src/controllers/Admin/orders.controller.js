const buy = async (req, res) => {
    try {
      // Lấy thông tin từ body request
      const { productId, quantity, userId, paymentMethod } = req.body;
      
      // Kiểm tra dữ liệu đầu vào
      if (!productId || !quantity || !userId) {
        return res.status(400).json({
          status: false,
          message: "Thiếu thông tin sản phẩm, số lượng hoặc người dùng"
        });
      }
  
      // Gọi vào module xử lý nghiệp vụ đặt hàng
      const result = await orderService.processOrder({
        productId,
        quantity,
        userId,
        paymentMethod
      });
  
      // Trả về kết quả thành công khi xử lý đơn hàng
      return res.status(200).json({
        status: true,
        message: "Đặt hàng thành công",
        data: result
      });
    } catch (error) {
      console.error("Lỗi khi xử lý đơn hàng:", error);
      return res.status(500).json({
        status: false,
        message: "Đã xảy ra lỗi khi xử lý đơn hàng"
      });
    }
  };