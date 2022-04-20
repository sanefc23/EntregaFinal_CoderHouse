const express = require('express');
const productRouter = express.Router();
const productController = require("../controllers/productController");

productRouter.get('/:id?', productController.getAll);
productRouter.post('/', productController.insert); //admin
productRouter.put('/:id', productController.update); //admin
productRouter.delete('/:id', productController.delete); //admin

module.exports = productRouter;