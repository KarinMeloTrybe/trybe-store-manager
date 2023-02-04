const express = require('express');
const salesController = require('../controllers/salesController');
const { validateProductId, validationQuantity } = require('../middlewares/middlewaresSales');

const salesRoute = express.Router();

salesRoute.post('/', validateProductId, validationQuantity, salesController.newSale);

salesRoute.get('/', salesController.getAllSales); 

salesRoute.get('/:id', salesController.getSaleId); 

module.exports = { salesRoute };