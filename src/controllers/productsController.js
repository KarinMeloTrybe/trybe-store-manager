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

const newProduct = async (request, response) => {
    const { name } = request.body;
    const product = {
      name,
    };
  const
  result = await productsService.newProduct(product);
return response.status(201).json(result);
};

const updateProduct = async (request, response) => {
  const { name } = request.body;
  const { id } = request.params;
  const { type, message } = await productsService.updateProduct(name, id);
  if (type) {
    return response.status(404).json({ message });
  }
  return response.status(200).json(message);
};

const deleteProduct = async (request, response) => {
 const { id } = request.params;
  const { type, message } = await productsService.deleteProduct(id);
  if (type) {
    return response.status(404).json({ message });
  }
  return response.status(204).json(message);
};

module.exports = {
  allProducts,
  productId,
  newProduct,
  updateProduct,
  deleteProduct,
};