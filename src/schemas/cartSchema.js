const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    timestamp: Date,
    products: [{
        id_prod: String,
        units: Number
    }, ],
    user: String
});

module.exports = mongoose.model('cart', cartSchema);