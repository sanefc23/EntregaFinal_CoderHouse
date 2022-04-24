const Cart = require('../models/Cart');
const fs = require('fs');
const file = 'src/cartsTest.json';

const cartController = {
    create: async (req, res) => {
        const newCart = new Cart();
        await fs.promises.readFile(file, "utf-8")
            .then(content => {
                const carts = JSON.parse(content);
                carts.push({
                    ...newCart,
                    products: req.body
                })
                console.log('updatedCarts: ', carts);
                fs.writeFileSync(file, JSON.stringify(carts))
                res.json(newCart.id)
            }).catch(e => console.log(e));
    },
    delete: async (req, res) => {
        await fs.promises.readFile(file, "utf-8")
            .then(content => {
                const carts = JSON.parse(content);
                const updatedCarts = carts.filter(c => c.id != req.params.id);
                if (carts.length != updatedCarts.length) {
                    fs.writeFileSync(file, JSON.stringify(updatedCarts))
                    res.json(updatedCarts)
                } else {
                    res.json('Carrito no encontrado.')
                }
            }).catch(e => console.log(e));
    },
    list: async (req, res) => {
        await fs.promises.readFile(file, "utf-8")
            .then(content => {
                const carts = JSON.parse(content);
                const foundCart = carts.filter(c => c.id == req.params.id);
                if (foundCart.length > 0) {
                    const cartProds = foundCart[0].products.map(p => p.id_prod)
                    res.json(cartProds);
                } else {
                    res.json('Carrito no encontrado.')
                }
            }).catch(e => console.log(e));
    },
    addProd: async (req, res) => {
        await fs.promises.readFile(file, "utf-8")
            .then(content => {
                const carts = JSON.parse(content);
                const index = carts.findIndex(c => c.id == req.params.id);
                if (index != -1) {
                    carts[index].products.push({
                        ...req.body
                    })
                    fs.writeFileSync(file, JSON.stringify(carts))
                    res.json(carts)
                } else {
                    res.json('Carrito no encontrado.')
                }

            }).catch(e => console.log(e));
    },
    removeProd: async (req, res) => {
        await fs.promises.readFile(file, "utf-8")
            .then(content => {
                const carts = JSON.parse(content);
                const index = carts.findIndex(c => c.id == req.params.id);
                if (index != -1) {
                    carts[index].products = carts[index].products.filter(p => p.id_prod != req.params.id_prod)
                    fs.writeFileSync(file, JSON.stringify(carts))
                    res.json(carts)
                } else {
                    res.json('Carrito no encontrado.')
                }

            }).catch(e => console.log(e));
    },
}

module.exports = cartController;