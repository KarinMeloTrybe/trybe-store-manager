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

module.exports = {
  allProducts,
  productId,
};