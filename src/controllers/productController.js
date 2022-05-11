const Product = require('../models/Product');
const productSchema = require('../schemas/productSchema');

const productController = {
    getAll: (req, res) => {
        if (req.params._id != undefined) {
            productSchema.find({
                    _id: req.params._id
                })
                .then(products => {
                    if (products.length > 0) {
                        res.status(200).json(products);
                    } else {
                        res.status(200).json('Producto no encontrado.');
                    }
                })
                .catch(e => {
                    res.json(e);
                })
        } else {
            productSchema.find().sort({
                    '_id': 1
                })
                .then(products => {
                    if (products.length) {
                        res.status(200).json(products);
                    } else {
                        res.json([]);
                    }
                })
                .catch(e => {
                    res.json(e);
                })
        }
    },
    insert: (req, res) => {
        let newProd = new Product();
        newProd = {
            ...newProd,
            ...req.body
        };
        productSchema.create(newProd)
            .then(() => {
                res.redirect('/api/products')
            })
            .catch(e => {
                res.json(e);
            });
    },
    update: (req, res) => {

        const updatedProd = {
            ...req.body
        };

        productSchema.findByIdAndUpdate(req.params._id, updatedProd)
            .then(prod => {
                res.redirect('/api/products')
            })
            .catch(e => {
                res.json(e);
            });
    },
    delete: async (req, res) => {
        productSchema.findByIdAndDelete(req.params._id)
            .then(prod => {
                res.redirect('/api/products');
            })
            .catch(e => {
                res.send("Error deleting product. ", e)
            });
    }
}

module.exports = productController;