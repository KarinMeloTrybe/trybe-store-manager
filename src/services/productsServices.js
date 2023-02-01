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

module.exports = {
  allProducts,
  productId,
  newProduct,
};