import db from "../../utils/db.js"
import bcrypt, { compareSync } from 'bcrypt'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth:{
        user: 'dohoang062005@gmail.com',
        pass: 'pmdl icml qzst dspp'
    },
    debug: true, 
    logger: false
})


const salt = bcrypt.genSaltSync(10);    

const getUserData = async (prams)=>{
    const id = prams || null
    const result = {
        status : true, 
        message : "Thành công"
    }
    if(id !== null){
        try {
            const data = db.query("SELECT ten_dn, email, hinh, vaitro, ngaycapnhatcuoi, trangthai FROM tk WHERE id = $1", [id])
            result.userData = (await data).rows[0]
        } catch (error) {
            result.status = false
            result.message = "Thất bại"
            result.err = `Lỗi: ${error.message}`
        }
    }else {
        result.status = false
        result.message = "Thất bại"
        result.err = 'Dữ liệu truy vấn bị bỏ rống'
    }
    return result
}

const Login = async (params) => {
    const userData = params;
    const result = {
        status: true
    };
    try {
        const data = await db.query(
            "SELECT ten_dn, mk, email, hinh, vaitro, ngaycapnhatcuoi, trangthai FROM tk WHERE ten_dn = $1", 
            [userData.userName]
        );
        if (data.rowCount > 0) {
            const user = data.rows[0];
            console.log(user)
            const passwordMatch = bcrypt.compareSync(userData.password, user.mk);
            if (passwordMatch) {
                result.message = 'Đăng nhập thành công';
                result.user = {
                    userName: user.ten_dn,
                    email: user.email,
                    avatar: user.hinh,
                    role: user.vaitro,
                    lastUpdate: user.ngaycapnhatcuoi,
                    status: user.trangthai
                };
            } else {
                result.status = false;
                result.message = 'Tên đăng nhập hoặc mật khẩu không chính xác';
            }
        } else {
            result.status = false;
            result.message = 'Không tìm thấy user';
        }
    } catch (error) {
        result.status = false;
        result.message = 'Đăng nhập thất bại';
        result.error = error.message;
    }
    return result;
};
const Register = async (params) => {
    const result = {
        status: true,
        message: "Thành công"
    };

    // Mã xác thực dạng chuỗi ngẫu nhiên
    const plainToken = Math.random().toString(36).substring(2, 15);
    const verificationToken = bcrypt.hashSync(plainToken, salt);
    const password = bcrypt.hashSync(params.data.password, salt);

    // Tạo user object
    const user = {
        fullName: params.data.fullName,
        username: params.data.UserName,
        password: password,
        email: params.data.email,
        avatar: "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg",
        role: "Người dùng",
        active: "Đang chờ",
        createDate: params.formattedDate,
        lastupdate: params.formattedDate,
        trangThai: 'Đang chờ',
        verificationCode: verificationToken
    };

    // Gửi mail xác thực
    const mailOptions = {
        from: 'dohoang062005@gmail.com',
        to: user.email,
        subject: "Xác nhận đăng ký tài khoản - Shoping Website",
        html: `
            <p>Chào bạn,</p>
            <p>Vui lòng nhấn vào link dưới đây để xác nhận tài khoản của bạn:</p>
            <p>
                <a href="http://localhost:5173/verify-account?token=${encodeURIComponent(plainToken)}" 
                style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 4px;">
                    Xác nhận tài khoản
                </a>
            </p>
            <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email.</p>
        `
    };

    try {
        const res = await db.query(
            `INSERT INTO tk 
             (ten_dn, mk, email, hinh, vaitro, ngaytao, ngaycapnhatcuoi, trangthai, verificationcode) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
             RETURNING id, ten_dn, email, hinh, vaitro, trangthai`,
            [
                user.username,
                user.password,
                user.email,
                user.avatar,
                user.role,
                user.createDate,
                user.lastupdate,
                user.active,
                user.verificationCode
            ]
        );

        const value = await db.query(
            `INSERT INTO ttnd 
             (idtaikhoan, hovaten, ngaysinh, gioitinh, iddiachi, sodienthoai, ngaytao, ngaycapnhatcuoi) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
                res.rows[0].id,
                user.fullName,
                null,
                null,
                null,
                null,
                user.createDate,
                user.createDate
            ]
        );

        await transporter.sendMail(mailOptions);

        if (res.rowCount > 0 && value.rowCount > 0) {
            result.data = res.rows[0];
        } else {
            result.status = false;
            result.message = "Có lỗi xảy ra khi tạo tài khoản.";
        }
    } catch (error) {
        result.status = false;
        result.message = "Lỗi: " + error.message;
    }

    return result;
};

const verifyEmail = async (token) => {
    try {
        const users = await db.query(`SELECT id, verificationcode FROM tk WHERE trangthai = 'Đang chờ'`);

        for (let user of users.rows) {
            const match = bcrypt.compareSync(token, user.verificationcode);
            if (match) {
                const res = await db.query(
                    `UPDATE tk SET trangthai = 'Đang hoạt động', verificationcode = null 
                     WHERE id = $1 RETURNING id`,
                    [user.id]
                );
                return res.rowCount > 0;
            }
        }

        return false;
    } catch (err) {
        console.error("Lỗi xác thực tài khoản:", err);
        return false;
    }
};


const findEmail = async (email) => {
    const result = {
        status: true
    };
    try {
        const data = await db.query(
            "SELECT email FROM tk WHERE email = $1", 
            [email]
        );
        if (data.rowCount > 0) {
            result.status = false
        }
    } catch (error) {
        result.status = false;
        result.error = error.message;
    }
    return result.status;
}

const getAllAccont = async (id)=>{
    const result = {
        status: true
    };
    try {
        const data = await db.query(
            "SELECT id, ten_dn, email, vaitro, trangthai, ngaytao FROM tk WHERE id != $1", 
            [id]
        );
        if (data.rowCount > 0) {
            result.data = data.rows
        }
    } catch (error) {
        result.status = false;
        result.message = error.message;
    }
    return result;
}

export default {
    getUserData,
    Login,
    Register, 
    findEmail,
    verifyEmail,
    getAllAccont
}