import productModule from '../../models/User/Product.module.js'

  
const getRecommendations = async (req, res)=>{
    const param = {
        page : req.query.page, 
        limit : req.query.limit
    }
    const list = await productModule.getRecommendations(param);

    if (!list.status) {
        return res.json({ status: 500, data: list.errMessage });
    }

    // Kết quả trả về
    const result = {
        status: 200,
        total: list.product.total,
        products: list.product.data,
    };

    res.json( result );
}

const getTrendingProducts = async (req, res)=>{
  const list = await productModule.getTrendingProducts();

  if (!list.status) {
      return res.json({ status: 500, data: list.errMessage });
  }

  // Kết quả trả về
  const result = {
      status: 200,
      total: list.product.total,
      products: list.product.data,
  };

  res.json( result );
}

export default { 
    getRecommendations,
    getTrendingProducts
};
