const Product = require('../models/Product');
const fs = require('fs');
const file = 'src/productsTest.json';

const productController = {
    getAll: async (req, res) => {
        console.log(req.params);

        await fs.promises.readFile(file, "utf-8")
            .then(content => {
                const products = JSON.parse(content);
                if (req.params.id === undefined) {
                    res.json(products);
                } else {
                    const foundProd = products.filter(p => p.id == req.params.id);
                    res.json(foundProd);
                }
            }).catch(e => console.log(e));
    },
    insert: async (req, res) => {
        await fs.promises.readFile(file, "utf-8")
            .then(content => {
                const products = JSON.parse(content);
                const newProd = new Product({
                    ...req.body
                });
                products.push(newProd);
                fs.writeFileSync(file, JSON.stringify(products))
                res.json(products)
            }).catch(e => console.log(e));

    },
    update: async (req, res) => {
        await fs.promises.readFile(file, "utf-8")
            .then(content => {
                const products = JSON.parse(content);
                const index = products.findIndex(p => p.id == req.params.id);
                if (index != -1) {
                    products[index] = new Product({
                        ...req.body
                    })
                    fs.writeFileSync(file, JSON.stringify(products))
                    res.json(products)
                } else {
                    res.json('Producto no encontrado.')
                }

            }).catch(e => console.log(e));
    },
    delete: async (req, res) => {
        await fs.promises.readFile(file, "utf-8")
            .then(content => {
                const products = JSON.parse(content);
                const updatedProds = products.filter(p => p.id != req.params.id);
                if (products.length != updatedProds.length) {
                    fs.writeFileSync(file, JSON.stringify(updatedProds))
                    res.json(updatedProds)
                } else {
                    res.json('Producto no encontrado.')
                }
            }).catch(e => console.log(e));
    }
}

module.exports = productController;