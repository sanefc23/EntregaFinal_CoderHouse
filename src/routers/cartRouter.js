const express = require('express');
const cartRouter = express.Router();
const cartController = require("../controllers/cartController");

cartRouter.post('/', cartController.create);
cartRouter.delete('/:id', cartController.delete);
cartRouter.get('/:id/products', cartController.list);
cartRouter.post('/:id/products', cartController.addProd);
cartRouter.delete('/:id/products/:id_prod', cartController.removeProd);

module.exports = cartRouter;