const express = require('express');
const productsController = require('../controllers/productsController');
const { validationName } = require('../middlewares/middlewaresProducts');

const productsRoute = express.Router();

productsRoute.get('/', productsController.allProducts);

productsRoute.get('/:id', productsController.productId);

productsRoute.post('/', validationName, productsController.newProduct);

productsRoute.put('/:id', validationName, productsController.updateProduct);

productsRoute.delete('/:id', productsController.deleteProduct);

module.exports = { productsRoute };