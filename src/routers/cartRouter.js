const express = require('express');
const cartRouter = express.Router();
const cartController = require("../controllers/cartController");
const validateAdmin = require('../middlewares/validateAdmin');

cartRouter.post('/', validateAdmin, cartController.create);
cartRouter.delete('/:_id', validateAdmin, cartController.delete);
cartRouter.get('/:_id/products', cartController.list);
cartRouter.post('/:cart_id/products', cartController.addProd);
cartRouter.delete('/:_id/products/:id_prod', cartController.removeProd);

module.exports = cartRouter;