import AccountModule from "../../models/User/Account.module.js"
import CategoryModule from "../../models/User/Category.module.js"
import ProductModule from "../../models/User/Product.module.js"
import ReviewsModule from "../../models/User/Reviews.module.js"
import ShoppingCartModule from "../../models/User/Shopping-cart.module.js"
const Homepage = (req, res)=>{
    const result = {}
    // thông tin người dùng
    const userInfor = 10 || null

    if(userInfor === null){
        result.isLogin = false
    }else{
        result.isLogin = true
        result.userData = AccountModule.getUserData(userInfor)
    }
    // số lượng giỏ hàng
    if(userInfor !== null){
        result.shoppingCart = ShoppingCartModule.getShoppingCartByUser(userInfor)
    } 
    // banner mặc định 
    result.Banner = {

    }
    // các danh mục sản phẩm nổi bật
    result.category = CategoryModule.getTrenCategory();
    // sản phẩm nổi bật 
    result.product = ProductModule.getProductForHomePage();
    // các đánh giá tích cực mới 
    result.reviews = ReviewsModule.getReviewsForHomepage();

    res.status(200).json({result})
}

export default {
    Homepage,

}