const salesService = require('../services/salesService');

const newSale = async (request, response) => {
  const sales = request.body;
  const { id, itemsSold } = await salesService.newSale(sales);

  if (!id) {
    return response.status(400).json({ message: '"productId" is required' });
  }

  return response.status(201).json({ id, itemsSold });
};

const getAllSales = async (_request, response) => {
const results = await salesService.getAllSales(); 
   return response.status(200).json(results);
};

 const getSaleId = async (request, response) => {
  const { id } = request.params;
   const { type, message } = await salesService.getSaleId(+id); // uso de + para conversão para number
   if (type) {
     return response.status(404).json({ message });
   }
   return response.status(200).json(message);
};

module.exports = {
  newSale,
  getAllSales,
  getSaleId,
};

/* const { id } = request.params;
const results = await salesService.getSaleId(+id);
   if (!results.length) {
     return response.status(404).json({ message: 'Sale not found' });
   }
   return response.status(200).json(results);  */

   // metodo 2 acima