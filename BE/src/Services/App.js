// MongoDB schemas for collections that would benefit from document structure

// Collection: phanHoi (Product Feedback)
// Migrated from SQL to MongoDB for nested replies and document structure benefits
db.phanHoi.createCollection({
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["idNguoiDung", "idSanPham", "noiDung", "loaiPhanHoi", "trangThai", "ngayDang"],
        properties: {
          idNguoiDung: { bsonType: "int" }, // Reference to SQL tk.id
          idSanPham: { bsonType: "int" },   // Reference to SQL sp.id
          noiDung: { bsonType: "string" },
          loaiPhanHoi: { 
            enum: ["Khiếu nại", "Đề xuất", "Khen ngợi", "Câu hỏi"]
          },
          trangThai: {
            enum: ["Mới", "Đã giải quyết", "Đã đóng", "Đang xử lý"]
          },
          chuDe: { bsonType: "string" },
          ngayDang: { bsonType: "date" },
          idNguoiGiaiQuyet: { bsonType: ["int", "null"] },
          // Nested replies instead of having a separate table with idPhanHoiCha
          phanHoiCon: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["idNguoiDung", "noiDung", "ngayDang"],
              properties: {
                idNguoiDung: { bsonType: "int" },
                noiDung: { bsonType: "string" },
                ngayDang: { bsonType: "date" }
              }
            }
          }
        }
      }
    }
  });
  
  // Collection: tinNhan (Messages)
  // Better suited for MongoDB due to chat/messaging nature
  db.tinNhan.createCollection({
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["nguoiGui", "nguoiNhan", "noiDung", "ngayGui"],
        properties: {
          nguoiGui: { bsonType: "int" },      // Reference to SQL tk.id
          nguoiNhan: { bsonType: "int" },     // Reference to SQL tk.id
          noiDung: { bsonType: "string" },
          ngayGui: { bsonType: "date" },
          daDoc: { bsonType: "bool", default: false },
          thoiGianDoc: { bsonType: ["date", "null"] },
          // Support for attachments
          dinhKem: {
            bsonType: "array",
            items: {
              bsonType: "object",
              properties: {
                loaiFile: { bsonType: "string" },
                duongDan: { bsonType: "string" },
                tenFile: { bsonType: "string" }
              }
            }
          }
        }
      }
    }
  });
  
  // Collection: logs (System Logs)
  // Better in MongoDB due to flexible schema and JSON nature
  db.logs.createCollection({
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["table_name", "action_type", "performed_at"],
        properties: {
          table_name: { bsonType: "string" },
          action_type: { 
            enum: ["INSERT", "UPDATE", "DELETE"]
          },
          old_data: { bsonType: "object" },
          new_data: { bsonType: "object" },
          performed_by: { bsonType: ["int", "null"] },
          performed_at: { bsonType: "date" },
          // Additional fields for better monitoring
          ip_address: { bsonType: "string" },
          user_agent: { bsonType: "string" }
        }
      }
    }
  });
  
  // Collection: sp_details (Product Details)
  // Better in MongoDB for rich product information that may vary across products
  db.sp_details.createCollection({
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["sp_id", "tenSP"],
        properties: {
          sp_id: { bsonType: "int" }, // Reference to SQL sp.id
          tenSP: { bsonType: "string" },
          moTa: { bsonType: "string" },
          khoiLuong: { bsonType: "int" },
          trangThai: { 
            enum: ["Còn Hàng", "Hết Hàng", "Chờ Nhập"]
          },
          danh_gia: { bsonType: "int" },
          ngay_tao: { bsonType: "date" },
          ngay_cap_nhat: { bsonType: "date" },
          gia: { bsonType: "double" },
          da_ban: { bsonType: "int" },
          dm: { bsonType: "int" }, // Reference to SQL dm.id
          // Product images embedded
          hinh_anh: {
            bsonType: "array",
            items: { 
              bsonType: "object",
              properties: {
                hinh: { bsonType: "string" },
                viTri: { bsonType: "int" },
                laChinh: { bsonType: "bool" }
              }
            }
          },
          // Technical specifications that can vary by product
          thongSoKyThuat: { bsonType: "object" },
          // Reviews embedded directly with product
          danhGia: {
            bsonType: "array",
            items: {
              bsonType: "object",
              properties: {
                idNguoiDung: { bsonType: "int" },
                soSao: { bsonType: "int" },
                noiDung: { bsonType: "string" },
                ngayDanhGia: { bsonType: "date" }
              }
            }
          }
        }
      }
    }
  });