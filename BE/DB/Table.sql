-- PostgreSQL optimized schema
SET client_encoding = 'UTF8';

-- User Account table
CREATE TABLE tk (
    id SERIAL PRIMARY KEY,
    ten_dn VARCHAR(255) NOT NULL UNIQUE,
    mk VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    hinh VARCHAR(255),
    vaiTro VARCHAR(20) NOT NULL CHECK (vaiTro IN ('Quản trị viên', 'Người dùng')),
    ngayTao DATE DEFAULT CURRENT_DATE,
    ngayCapNhatCuoi DATE DEFAULT CURRENT_DATE,
    trangThai VARCHAR(30) NOT NULL CHECK (trangThai IN ('Hoạt động', 'Bị chặn', 'Đang chờ'))
);

-- Address table
CREATE TABLE diaChi (
    id SERIAL PRIMARY KEY,
    idNguoiDung INTEGER NOT NULL,
    soNha VARCHAR(255),
    pho VARCHAR(255),
    quan VARCHAR(255),
    huyen VARCHAR(255),
    thanhPho VARCHAR(255),
    trangThai VARCHAR(50) NOT NULL CHECK (trangThai IN ('Hoạt động', 'Đã xóa')),
    FOREIGN KEY (idNguoiDung) REFERENCES tk(id) ON DELETE CASCADE
);

-- User details table
CREATE TABLE ttnd (
    id SERIAL PRIMARY KEY,
    idTaiKhoan INTEGER NOT NULL,
    hoVaTen VARCHAR(255) NOT NULL,
    ngaySinh DATE NOT NULL,
    gioiTinh VARCHAR(10) NOT NULL CHECK (gioiTinh IN ('Nam', 'Nữ')),
    IdDiaChi INTEGER NOT NULL,
    soDienThoai VARCHAR(20) NOT NULL,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngayCapNhatCuoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idTaiKhoan) REFERENCES tk(id) ON DELETE CASCADE,
    FOREIGN KEY (IdDiaChi) REFERENCES diaChi(id) ON DELETE RESTRICT
);

-- Added index for faster user lookups
CREATE INDEX idx_ttnd_idTaiKhoan ON ttnd(idTaiKhoan);

-- Categories table
CREATE TABLE dm (
    id SERIAL PRIMARY KEY,
    tenDanhMuc TEXT NOT NULL,
    moTa TEXT,
    danhMucCha INTEGER DEFAULT 0
);

-- Sample category data
INSERT INTO dm (tenDanhMuc, moTa, danhMucCha) VALUES
  ('Hóa chất hữu cơ', 'Các hợp chất hữu cơ chủ yếu chứa cacbon, hydro, oxy và các nguyên tố khác.', 0),
  ('Hóa chất vô cơ', 'Các hợp chất vô cơ không chứa cacbon, chủ yếu là kim loại và phi kim loại.', 0),
  ('Axit sulfuric', 'Axit mạnh, quan trọng trong sản xuất phân bón và xử lý chất thải.', 2),
  ('Axit nitric', 'Axit nitric được sử dụng trong sản xuất phân bón và chất nổ.', 2),
  ('Hydrochloric acid', 'Dung dịch axit clohidric, dùng để xử lý kim loại và làm sạch bề mặt.', 2),
  ('Sodium hydroxide', 'Dung dịch kiềm mạnh, được dùng trong sản xuất xà phòng và xử lý nước thải.', 2),
  ('Ethanol', 'Rượu ethanol, được sử dụng làm dung môi, khử trùng và nhiên liệu sinh học.', 1),
  ('Acetone', 'Dung môi hữu cơ phổ biến, được dùng trong công nghiệp sơn và làm sạch.', 1),
  ('Methanol', 'Dung môi và nhiên liệu, cần được xử lý cẩn thận do độc tính cao.', 1),
  ('Benzene', 'Hợp chất hữu cơ dễ bay hơi, được sử dụng làm dung môi và sản xuất hóa chất.', 1);

-- Products table
CREATE TABLE sp (
    id SERIAL PRIMARY KEY,
    tenSP VARCHAR(255) NOT NULL,
    moTa TEXT,
    khoiLuong INTEGER CHECK(khoiLuong >= 0),
    TrangThai VARCHAR(20) NOT NULL CHECK (TrangThai IN ('Còn Hàng', 'Hết Hàng', 'Chờ Nhập')),
    danh_gia SMALLINT CHECK(danh_gia > 0 AND danh_gia <= 5) DEFAULT 5,
    ngay_tao DATE NOT NULL DEFAULT CURRENT_DATE,
    ngay_cap_nhat DATE,
    gia DECIMAL(10,2) CHECK(gia >= 0),
    da_ban INTEGER CHECK(da_ban >= 0) DEFAULT 0,
    dm INTEGER REFERENCES dm(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Added index for category searches
CREATE INDEX idx_sp_dm ON sp(dm);

-- Product images table
CREATE TABLE sp_hinh (
    id SERIAL PRIMARY KEY,
    sp_id INTEGER NOT NULL,
    hinh VARCHAR(255) NOT NULL,
    FOREIGN KEY (sp_id) REFERENCES sp(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Payment methods table
CREATE TABLE ttThanhToan (
    id SERIAL PRIMARY KEY,
    tenPhuongThuc VARCHAR(255) NOT NULL,
    trangThai VARCHAR(20) NOT NULL CHECK (trangThai IN ('Hoạt Động', 'Bị Khóa')),
    moTa TEXT
);

-- Sample payment methods
INSERT INTO ttThanhToan (tenPhuongThuc, trangThai, moTa) VALUES
('Thanh toán khi nhận hàng (COD)', 'Hoạt Động', 'Khách hàng thanh toán tiền mặt khi nhận hàng'),
('Chuyển khoản ngân hàng', 'Hoạt Động', 'Khách hàng chuyển khoản vào tài khoản ngân hàng của cửa hàng'),
('Thanh toán qua ví điện tử', 'Hoạt Động', 'Thanh toán bằng các ví điện tử như Momo, ZaloPay, ViettelPay'),
('Thẻ tín dụng/Ghi nợ', 'Hoạt Động', 'Chấp nhận thanh toán bằng thẻ Visa, MasterCard, JCB, ATM nội địa');

-- Vouchers table
CREATE TABLE voucher (
    id SERIAL PRIMARY KEY,
    NgayBatDau TIMESTAMP NOT NULL, 
    NgayKetThuc TIMESTAMP NOT NULL, 
    Loai VARCHAR(50) NOT NULL, 
    GiaTri DECIMAL(5,2) CHECK (GiaTri > 0 AND GiaTri < 50), 
    DanhMucApDung INTEGER REFERENCES dm(id) ON DELETE SET NULL ON UPDATE CASCADE,
    TrangThai VARCHAR(20) NOT NULL CHECK (TrangThai IN ('Hoạt Động', 'Hết Hạn', 'Chưa Kích Hoạt')),
    maVoucher VARCHAR(100) NOT NULL UNIQUE,
    MoTa TEXT
);

-- Orders table
CREATE TABLE Orders (
    OrderID SERIAL PRIMARY KEY,
    ngayDatHang TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tongTien DECIMAL(18,2) CHECK (tongTien >= 0),
    trangThai VARCHAR(20) NOT NULL CHECK (trangThai IN ('Chờ xử lý', 'Đang giao', 'Đã giao', 'Đã Hủy')),
    Ghichu TEXT,
    AccountId INTEGER NOT NULL,
    UserID INTEGER NOT NULL,
    PaymentMethodID INTEGER NOT NULL,
    NgayGiaoHangDuKien TIMESTAMP,
    donViVanChuyen VARCHAR(100),
    maDonVanChuyen VARCHAR(50),
    VoucherId INTEGER REFERENCES voucher(id) ON DELETE SET NULL ON UPDATE CASCADE,
    NgayCapNhatCuoi TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    AddressId INTEGER NOT NULL,
    
    CONSTRAINT CHK_DeliveryDate CHECK (NgayCapNhatCuoi >= ngayDatHang),
    FOREIGN KEY (AccountId) REFERENCES tk(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (UserID) REFERENCES ttnd(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (PaymentMethodID) REFERENCES ttThanhToan(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (AddressId) REFERENCES diaChi(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Added index for order status queries
CREATE INDEX idx_orders_trangThai ON Orders(trangThai);
CREATE INDEX idx_orders_AccountId ON Orders(AccountId);

-- Order details table
CREATE TABLE OrderDetails (
    OrderDetailID SERIAL PRIMARY KEY,
    OrderID INTEGER NOT NULL,
    ProductID INTEGER NOT NULL,
    Quantity INTEGER NOT NULL CHECK (Quantity > 0),
    Price DECIMAL(18,2) NOT NULL CHECK (Price >= 0),
    Discount DECIMAL(5,2) CHECK (Discount >= 0 AND Discount <= 100) DEFAULT 0,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES sp(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Computed total column using a view instead of generated column (which works differently in PostgreSQL)
CREATE OR REPLACE FUNCTION get_order_detail_total(qty INTEGER, prc DECIMAL, disc DECIMAL)
RETURNS DECIMAL AS $$
BEGIN
  RETURN qty * prc * (1 - disc/100);
END;
$$ LANGUAGE plpgsql;

-- Logs table
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(255) NOT NULL,
    action_type VARCHAR(10) NOT NULL CHECK (action_type IN ('INSERT', 'UPDATE', 'DELETE')),
    old_data JSONB,
    new_data JSONB,
    performed_by INTEGER REFERENCES tk(id) ON DELETE SET NULL,
    performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Actions table
CREATE TABLE hanhDong (
    id SERIAL PRIMARY KEY,
    action_type TEXT NOT NULL,
    performed_by INTEGER REFERENCES tk(id) ON DELETE SET NULL ON UPDATE CASCADE,
    performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);