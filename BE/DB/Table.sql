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

CREATE TABLE chemical (
    id SERIAL PRIMARY KEY,
    spid INTEGER,
    tinh_chat_hoa_hoc VARCHAR(20) NOT NULL, -- 'hữu cơ' hoặc 'vô cơ'
    nguon_goc          VARCHAR(20) NOT NULL, -- 'tổng hợp' hoặc 'tự nhiên'
    cong_dung        VARCHAR(20) NOT NULL,   -- 'công nghiệp', 'y tế', 'thí nghiệm', 'nông nghiệp'
    muc_do_nguy_hiem VARCHAR(20) NOT NULL,   -- 'Độc hại', 'dễ cháy', 'ăn mòn', 'an toàn'
    trang_thai       VARCHAR(20) NOT NULL,   -- 'rắn', 'lỏng', 'khí'
    CONSTRAINT fk_sp FOREIGN KEY (spid) REFERENCES sp(id),
    CONSTRAINT chk_tinh_chat CHECK (tinh_chat_hoa_hoc IN ('hữu cơ', 'vô cơ')),
    CONSTRAINT chk_nguon_goc CHECK (nguon_goc IN ('tổng hợp', 'tự nhiên')),
    CONSTRAINT chk_cong_dung CHECK (cong_dung IN ('công nghiệp', 'y tế', 'thí nghiệm', 'nông nghiệp')),
    CONSTRAINT chk_muc_do_nguy_hiem CHECK (muc_do_nguy_hiem IN ('Độc hại', 'dễ cháy', 'ăn mòn', 'an toàn')),
    CONSTRAINT chk_trang_thai CHECK (trang_thai IN ('rắn', 'lỏng', 'khí'))
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

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES public.tk(id) ON DELETE SET NULL,
    product_id INTEGER REFERENCES sp(id) ON DELETE CASCADE,
    order_id INTEGER REFERENCES orders(orderid) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(255),
    comment TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    seller_service_rating INTEGER CHECK (seller_service_rating BETWEEN 1 AND 5),
    delivery_speed_rating INTEGER CHECK (delivery_speed_rating BETWEEN 1 AND 5),
    delivery_person_rating INTEGER CHECK (delivery_person_rating BETWEEN 1 AND 5),
    verified_purchase BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- mục đích: lọc, phân tích
CREATE TABLE review_tags (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE review_tag_relations (
    relation_id SERIAL PRIMARY KEY,
    review_id INTEGER REFERENCES reviews(review_id) ON DELETE CASCADE, -- khi các liên kết bị xóa thì các trường liên quan cũng bị xóa 
    tag_id INTEGER REFERENCES review_tags(tag_id) ON DELETE CASCADE,
    UNIQUE(review_id, tag_id)
);

CREATE TABLE review_media (
    media_id SERIAL PRIMARY KEY,
    review_id INTEGER REFERENCES reviews(review_id) ON DELETE CASCADE,
    media_type VARCHAR(10) NOT NULL, -- 'image' or 'video'
    url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE reward_points (
    reward_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES tk(id) ON DELETE CASCADE,
    review_id INTEGER REFERENCES reviews(review_id) ON DELETE SET NULL,
    points INTEGER NOT NULL DEFAULT 0,
    reason VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE review_votes (
    vote_id SERIAL PRIMARY KEY,
    review_id INTEGER REFERENCES reviews(review_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES tk(id) ON DELETE CASCADE,
    is_helpful BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(review_id, user_id)
);



-- 1) (Tuỳ chọn) Tạo ENUM type cho trường status
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_status') THEN
    CREATE TYPE product_status AS ENUM (
      'Còn Hàng',       -- Còn hàng
      'Hết Hàng',   -- Hết hàng
      'Chờ Nhập',        -- Chờ nhập
      'Ngưng kinh Doanh'    -- Ngưng kinh doanh
    );
  END IF;
END$$;

-- 2) Tạo bảng warehouse_inventory
CREATE TABLE public.warehouse_inventory (
  id                 BIGSERIAL PRIMARY KEY,
  product_id         INT         NOT NULL,
  product_type       VARCHAR(100)   NOT NULL,
  unit_of_measure    VARCHAR(50)    NOT NULL,       -- e.g. 'kg', 'L'
  quantity           NUMERIC(18,3)  NOT NULL,       -- số lượng tồn
  unit_weight        NUMERIC(18,6),                  -- khối lượng trên mỗi đơn vị (nếu cần)
  total_weight       NUMERIC(18,6)  GENERATED ALWAYS AS (quantity * COALESCE(unit_weight, 1)) STORED,
  batch_number       VARCHAR(50),                    -- mã lô
  cas_number         VARCHAR(50),                    -- CAS Registry Number
  hazard_class       VARCHAR(100),                   -- GHS hazard class
  storage_temp_range VARCHAR(50),                    -- e.g. '2–8°C'
  expiry_date        DATE,                           -- hạn sử dụng
  manufacturer       VARCHAR(255),                   -- nhà sản xuất
  safety_data_sheet  TEXT,                           -- URL hoặc nội dung SDS
  shelf_location     VARCHAR(100),                   -- ví dụ 'A2-04'
  min_stock_level    NUMERIC(18,3),                  -- ngưỡng cảnh báo
  reorder_point      NUMERIC(18,3),                  -- điểm đặt hàng lại
  status             product_status NOT NULL DEFAULT 'Còn Hàng',
  created_at         TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- 3) Khóa ngoại sang bảng products
ALTER TABLE public.warehouse_inventory
  ADD CONSTRAINT fk_inventory_product
    FOREIGN KEY (product_id)
    REFERENCES public.sp(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT;

-- 4) Trigger tự động cập nhật updated_at khi bản ghi thay đổi
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_warehouse_inventory_updated
  BEFORE UPDATE ON public.warehouse_inventory
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();
