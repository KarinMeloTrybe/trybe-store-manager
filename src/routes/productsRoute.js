const express = require('express');
const productsController = require('../controllers/productsController');
const { validationName } = require('../middlewares/middlewaresProducts');

const productsRoute = express.Router();

productsRoute.get('/', productsController.allProducts);

productsRoute.get('/:id', productsController.productId);

productsRoute.post('/', validationName, productsController.newProduct);

module.exports = { productsRoute };