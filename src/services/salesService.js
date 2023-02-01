const salesModel = require('../models/productsModel');

const newSale = async (sale) => {
    const getNewSaleId = await salesModel.newSale(sale);
    return getNewSaleId;
  }; 
  
  module.exports = {
    newSale,
  };