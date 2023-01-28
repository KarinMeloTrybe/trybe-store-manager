const productsService = require('../services/productsServices');

const allProducts = async (_request, response) => {
  try {
    const { result } = await productsService.allProducts();
    return response.status(200).json(result);
  } catch (err) { 
    return response.status(404).json({
      message: 'Product not found',
    });
  }
};

const productId = async (request, response) => {
    const { id } = request.params;
    const {
      result } = await productsService.productId(id);
  if (!result) {
 return response.status(404).json({
    message: 'Product not found',
  }); 
}
  return response.status(200).json(result);
};

module.exports = {
  allProducts,
  productId,
};