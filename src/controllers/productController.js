const Product = require('../models/Product');

const productController = {
    getAll: (req, res) => {
        res.json({
            hello: 'hello'
        })
    },
    getById: (req, res) => {},
    insert: (req, res) => {},
    update: (req, res) => {},
    delete: (req, res) => {}
}

module.exports = productController;