const salesService = require('../services/salesService');

const newSale = async (request, response) => {
    const { name, quantity }  = request.body;
    const sale = [{
      productId,
      name,
      quantity,
    }];
  const
  result = await salesService.newSale(sale);
return response.status(201).json(result);
};

module.exports = {
  newSale,
};