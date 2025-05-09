import AccountModule from '../../models/User/Account.module.js';


// đăng nhập 
const loginController = async (req, res)=>{
    const data = req.body || null;
    console.log(data)
    const result = {
        status: true, 
        message: 'Thành công', 
    }
    if(data !== null){
        try {
            const res = await AccountModule.Login(data)
            if(res.status){
                result.data = res.data
            }else{
                result.status = false
                result.message = "Thất bại!"
                result.err = 'Lỗi' + error.message
            }
        } catch (error) {
            result.status = false
            result.message = "Thất bại!"
            result.err = 'Lỗi' + error.message
        }
    }else{
        result.status = false
        result.message = "Dữ liệu trống!"
    }
}

const registerController = async (req, res) => {
    const data = req.body;
    const result = {
        status: true,
        message: 'Thành công'
    };

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
   
    // Sinh mã xác thực OTP (ví dụ 6 chữ số)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    try {
        // Kiểm tra xem email đã tồn tại hay chưa (giả sử findEmail trả về true nếu tìm thấy email)
        const isMailExist = await AccountModule.findEmail(data.email); 
        if (!isMailExist) {
            result.status = false;
            result.message = "Email đã tồn tại!";
        } else {
            // Đảm bảo truyền đủ dữ liệu cho hàm Register. Ở đây thống nhất đặt tên verificationCode.
            const users = await AccountModule.Register({
                data,
                formattedDate,
                verificationCode  // truyền đúng tên biến
            });
            result.status = users.status
            result.data = users.status ? users.data : result.message = users.message ;
        }
    } catch (error) {
        result.status = false;
        result.message = error.message;
    }

    res.status(result.status ? 200 : 500).json(result);
};


const verifyAccount = async (req, res) => {
    const islogin = req.query.islogin; // là email hoặc mã xác thực được gửi kèm link

    const result = {
        status: true,
        message: "Xác thực tài khoản thành công!"
    };

    try {
        if (!islogin) {
            result.status = false;
            result.message = "Thiếu thông tin xác thực.";
        } else {
            const updated = await AccountModule.verifyEmail(islogin);

            if (!updated) {
                result.status = false;
                result.message = "Không thể xác thực tài khoản hoặc tài khoản không tồn tại.";
            }
        }
    } catch (error) {
        result.status = false;
        result.message = error.message;
    }

    res.status(result.status ? 200 : 400).json(result);
};

const getAllAcount = async (req, res)=>{
    const result = {
        status: true,
        message: 'Thành công!'
    }

    const id = 1

    try {
        const data = await AccountModule.getAllAccont(id);
        if(data.status){
            result.data = data.data
        }else{
            result.status = data.status
            result.message = data.message
        }
    } catch (error) {
        result.message = `Lỗi: ${error.message}`
        result.status = false
    }finally {
        res.status(result.status ? 200 : 500).json(result)
    }
}

export default {
    loginController, 
    registerController,
    verifyAccount,
    getAllAcount
}