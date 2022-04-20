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
    insert: (req, res) => {},
    update: (req, res) => {},
    delete: (req, res) => {}
}

module.exports = productController;