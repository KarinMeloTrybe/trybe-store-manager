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

const deleteSale = async (id) => {
  const affectedRows = await salesModel.deleteSale(id);
  if (affectedRows < 1) {
    return { type: 'error', message: 'Sale not found' };
  }
  return { type: null, message: '' };
};

const updateSale = async (body, id) => {
  const promises = body.map(async ({ productId, quantity }) => {
 const affectedRows = await salesModel.updateSale(quantity, id, productId);
 return affectedRows;
  })
  const results = await Promise.all(promises);
   const hasError = results.some((affectedRows) => affectedRows < 1 )
  if (hasError) {
    return { type: 'error', message: 'Sale not found' };
  }
  return { type: null, message: { saleId: id, itemsUpdated: body } };
};

module.exports = {
  newSale,
  getAllSales,
  getSaleId,
  deleteSale,
  updateSale,
};
