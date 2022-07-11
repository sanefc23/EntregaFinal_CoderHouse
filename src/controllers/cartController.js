const Cart = require('../models/Cart');
const cartSchema = require('../schemas/cartSchema');
const userSchema = require('../schemas/userSchema');
const sendWPMessage = require('../services/twilio');
const sendEmail = require('../services/sendEmail');
const config = require('../config/config');


const cartController = {
    create: (req, res) => {
        let cart = new Cart();
        console.log(req.session.passport);
        cart = {
            ...cart,
            ...req.session.passport
        }
        cart.products.push(...req.body);
        cartSchema.create(cart)
            .then(created => {
                res.cookie('userCart', JSON.stringify(created), {
                    maxAge: 60 * 100000
                });
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
                        res.cookie('userCart', JSON.stringify(cart), {
                            maxAge: 60 * 10000
                        });
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
    },
    checkout: (req, res) => {
        const cart = JSON.parse(req.cookies.userCart);
        userSchema.findOne({
                email: cart.user
            })
            .then(async userData => {
                const content = `Hola ${userData.name}! Recibimos correctamente tu orden #${cart._id}.\nLo vas a estar recibiendo en tu domicilio ${userData.adress}.\nProductos:\n${cart.products.map(p => `${p.id_prod} x ${p.units}\n`)}`;
                const emailMessage = {
                    from: {
                        name: config.ETHEREAL_NAME,
                        address: config.ETHEREAL_EMAIL
                    },
                    to: config.ETHEREAL_EMAIL,
                    subject: `Recibimos tu orden #${cart._id}`,
                    html: `
                        <h1>Hola ${userData.name}! Recibimos correctamente tu orden #${cart._id}.</h1>
                        <p>Lo vas a estar recibiendo en tu domicilio ${userData.adress}.\nProductos:\n${cart.products.map(p => `${p.id_prod} x ${p.units}\n`)}</p>
                        `,
                }

                const response = await sendWPMessage(userData.phone, content)
                const email = await sendEmail(emailMessage)
                res.json({
                    response,
                    email
                })
            })
            .catch(e => console.log(e));
    }
}

module.exports = cartController;