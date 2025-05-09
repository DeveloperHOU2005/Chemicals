import axios from "axios"
const account = {
    avatar : "https://res.cloudinary.com/dmzcks0q6/image/upload/v1744222658/jsxrg5ohx4v4ynq9fw4u.jpg", 
    UserName: 'Admin',
    fullName: 'Đỗ Việt Hoàng', 
    role: 'Quản trị viên',
    status: 'Hoạt động'   
}

const dashboard = ()=>{
    try {
        
    } catch (error) {
        
    }
}

const getAccount = ()=>{
    return account
}
const setAccount = (value)=>{
    account = value 
}
export default {
    account,
    getAccount,
    dashboard, 
    setAccount
}