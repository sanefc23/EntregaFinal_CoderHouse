const express = require('express');
const productRouter = express.Router();
const productController = require("../controllers/productController");
const validateAdmin = require('../middlewares/validateAdmin');

productRouter.get('/:id?', productController.getAll);
productRouter.post('/', validateAdmin, productController.insert); //admin
productRouter.put('/:id', validateAdmin, productController.update); //admin
productRouter.delete('/:id', validateAdmin, productController.delete); //admin

module.exports = productRouter;