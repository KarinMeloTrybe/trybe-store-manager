const express = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = express.Router();

productsRoute.get('/', productsController.allProducts);

productsRoute.get('/:id', productsController.productId);

module.exports = { productsRoute };