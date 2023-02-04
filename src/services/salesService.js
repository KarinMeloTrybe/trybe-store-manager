const salesModel = require('../models/salesModel');

const newSale = async (sales) => {
  const verificationProductId = await salesModel.newSale(sales);
  await Promise.all(sales.map(({ productId, quantity }) => salesModel
    .salesRegistry(verificationProductId, productId, quantity)));
  return { id: verificationProductId, itemsSold: sales }; 
};

const getAllSales = async () => {
  const results = await salesModel.getAllSales();
  return results;
};

const getSaleId = async (id) => {
  const results = await salesModel.getSaleId(id);
 if (!results.length) {
    return { type: 'error', message: 'Sale not found' };
  }
  return { type: null, message: results };
};

module.exports = {
  newSale,
  getAllSales,
  getSaleId,
};
