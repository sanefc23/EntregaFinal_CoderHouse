const Cart = require('../models/Cart');
const cartSchema = require('../schemas/cartSchema');

const cartController = {
    create: (req, res) => {
        const cart = new Cart();
        cart.products.push(...req.body);
        cartSchema.create(cart)
            .then(created => {
                res.json({
                    cart_id: created.id
                });
            })
            .catch(e => {
                res.json(e);
            });
    },
    delete: (req, res) => {
        let id = req.params.id;
        cartSchema.findByIdAndDelete(id)
            .then(cart => {
                res.status(200).send('Carrito borrado.');
            })
            .catch(e => {
                res.send(e);
            });
    },
    list: (req, res) => {
        cartSchema.findById(req.params._id)
            .then(cart => {
                res.status(200).json(cart.products);
            })
            .catch(e => {
                res.json(e)
            });
    },
    addProd: (req, res) => {
        cartSchema.findByIdAndUpdate(
                req.params.cart_id, {
                    $push: {
                        "products": {
                            ...req.body
                        }
                    }
                }, {
                    safe: true,
                    upsert: true
                })
            .then(() => {
                cartSchema.findById(req.params.cart_id)
                    .then(cart => {
                        res.status(200).json(cart);
                    })
                    .catch(e => {
                        res.json("Error deleting cart. ", e)
                    })
            })
            .catch(e => console.log(e));
    },
    removeProd: (req, res) => {
        cartSchema.findById({
                _id: req.params._id
            })
            .then(cart => {
                const updatedProducts = cart.products.filter(p => p.id_prod != req.params.id_prod)
                cartSchema.findByIdAndUpdate(req.params._id, {
                        "products": updatedProducts
                    }, {
                        safe: true
                    })
                    .then(() => {
                        cartSchema.findById(req.params._id)
                            .then(cart => {
                                res.status(200).json(cart);
                            })
                            .catch(e => {
                                res.json("Error deleting product from cart. ", e)
                            })
                    })
                    .catch(e => {
                        res.json(e)
                    })
            })
    }
}

module.exports = cartController;