 const salesModel = require('../models/salesModel');

const validateProductId = async (request, response, next) => {
  const sales = request.body;
  const validatedIds = await salesModel.validateIds();
  const productIds = sales.map((sale) => sale.productId);

  if (productIds.includes(undefined)) {
    return response.status(400).json({ message: '"productId" is required' });
  }

  if (!productIds.every((id) => validatedIds.includes(id))) {
    return response.status(404).json({ message: 'Product not found' });
  }

  next();
};

const validationQuantity = (request, response, next) => {
  const sales = request.body;
  const quantities = sales.map((sale) => sale.quantity);

  if (quantities.includes(undefined)) {
    return response.status(400).json({ message: '"quantity" is required' });
  }

  if (quantities.some((q) => q < 1)) {
    return response.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  validateProductId,
  validationQuantity,
};
