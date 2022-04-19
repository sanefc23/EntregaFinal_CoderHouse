const express = require('express');
const productRouter = express.Router();
const productController = require("../controllers/productController");

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.post('/', productController.insert); //admin
productRouter.put('/:id', productController.update); //admin
productRouter.delete('/:id', productController.delete); //admin

module.exports = productRouter;
