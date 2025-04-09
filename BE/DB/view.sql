CREATE VIEW v_san_pham_voi_hinh AS
SELECT 
    sp.id,
    sp.tenSP,
    sp.moTa,
    sp.khoiLuong,
    sp.TrangThai,
    sp.danh_gia,
    sp.ngay_tao,
    sp.ngay_cap_nhat,
    sp.gia,
    sp.da_ban,
    sp.dm,
    (
        SELECT hinh
        FROM sp_hinh
        WHERE sp_hinh.sp_id = sp.id
        ORDER BY id
        LIMIT 1
    ) AS hinh_dai_dien
FROM sp;


CREATE VIEW v_thong_tin_nguoi_dung_day_du AS
SELECT 
    tk.id AS tai_khoan_id,
    tk.ten_dn,
    tk.email,
    tk.hinh AS hinh_dai_dien,
    tk.vaiTro,
    tk.ngayTao,
    tk.ngayCapNhatCuoi,
    tk.trangThai AS trang_thai_tk,

    ttnd.id AS thong_tin_id,
    ttnd.hoVaTen,
    ttnd.ngaySinh,
    ttnd.gioiTinh,
    ttnd.soDienThoai,
    ttnd.ngayTao AS ngay_tao_tt,
    ttnd.ngayCapNhatCuoi AS ngay_cap_nhat_tt,

    dc.id AS dia_chi_id,
    dc.soNha,
    dc.pho,
    dc.quan,
    dc.huyen,
    dc.thanhPho,
    dc.trangThai AS trang_thai_dc

FROM tk
JOIN ttnd ON tk.id = ttnd.idTaiKhoan
JOIN diaChi dc ON ttnd.IdDiaChi = dc.id;


CREATE OR REPLACE VIEW vw_OrderDetails AS
SELECT 
    o.OrderID,
    o.ngayDatHang AS NgayDatHang,
    o.tongTien AS TongTien,
    o.trangThai AS TrangThai,
    o.Ghichu AS GhiChu,
    o.AccountId,
    o.UserID,
    o.PaymentMethodID,
    o.NgayGiaoHangDuKien,
    o.donViVanChuyen,
    o.maDonVanChuyen,
    o.VoucherId,
    o.NgayCapNhatCuoi,
    o.AddressId,
    od.OrderDetailID,
    od.ProductID,
    od.Quantity,
    od.Price,
    od.Discount,
    (od.Price * od.Quantity * (1 - od.Discount/100)) AS ThanhTien,
    COUNT(od.OrderDetailID) OVER (PARTITION BY o.OrderID) AS SoLuongSanPham
FROM 
    Orders o
JOIN 
    OrderDetails od ON o.OrderID = od.OrderID;

-- View để tổng hợp thông tin đơn hàng
CREATE OR REPLACE VIEW vw_OrderSummary AS
SELECT 
    o.OrderID,
    o.ngayDatHang,
    o.tongTien,
    o.trangThai,
    o.AccountId,
    o.UserID,
    o.PaymentMethodID,
    o.NgayGiaoHangDuKien,
    o.donViVanChuyen,
    COUNT(od.OrderDetailID) AS TongSoSanPham,
    SUM(od.Quantity) AS TongSoLuong,
    COALESCE(SUM(od.Price * od.Quantity * (1 - od.Discount/100)), 0) AS TongTienSanPham
FROM 
    Orders o
LEFT JOIN 
    OrderDetails od ON o.OrderID = od.OrderID
GROUP BY 
    o.OrderID, o.ngayDatHang, o.tongTien, o.trangThai, o.AccountId, o.UserID, 
    o.PaymentMethodID, o.NgayGiaoHangDuKien, o.donViVanChuyen;

-- View cho đơn hàng gần đây theo người dùng
CREATE OR REPLACE VIEW vw_RecentUserOrders AS
SELECT 
    o.AccountId,
    o.UserID,
    o.OrderID,
    o.ngayDatHang,
    o.tongTien,
    o.trangThai,
    o.NgayGiaoHangDuKien,
    o.donViVanChuyen,
    COUNT(od.OrderDetailID) AS SoSanPham
FROM 
    Orders o
LEFT JOIN 
    OrderDetails od ON o.OrderID = od.OrderID
GROUP BY 
    o.AccountId, o.UserID, o.OrderID, o.ngayDatHang, o.tongTien, o.trangThai, 
    o.NgayGiaoHangDuKien, o.donViVanChuyen
ORDER BY 
    o.ngayDatHang DESC;

-- View thống kê tình trạng đơn hàng
CREATE OR REPLACE VIEW vw_OrderStatusStats AS
SELECT 
    trangThai,
    COUNT(*) AS SoLuongDon,
    SUM(tongTien) AS TongGiaTri,
    MIN(ngayDatHang) AS NgayDonDauTien,
    MAX(ngayDatHang) AS NgayDonGanNhat
FROM 
    Orders
GROUP BY 
    trangThai;