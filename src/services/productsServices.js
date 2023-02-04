const productsModel = require('../models/productsModel');

const allProducts = async () => {
const getAllProducts = await productsModel.allProducts(); 
  return { result: getAllProducts };
};

const productId = async (id) => {
  const getproductId = await productsModel.productId(id);
  return {
    result: getproductId };
}; 

const newProduct = async (product) => {
  const getNewproductId = await productsModel.newProduct(product);
  return getNewproductId;
}; 

const updateProduct = async (name, id) => {
  const affectedRows = await productsModel.updateProduct(name, id);
  if (affectedRows < 1) {
    return { type: 'error', message: 'Product not found' };
  }
  return { type: null, message: { id, name } };
};

const deleteProduct = async (id) => {
 const affectedRows = await productsModel.deleteProduct(id);
  if (affectedRows < 1) {
    return { type: 'error', message: 'Product not found' };
  }
  return { type: null, message: '' };
};

module.exports = {
  allProducts,
  productId,
  newProduct,
  updateProduct,
  deleteProduct,
};