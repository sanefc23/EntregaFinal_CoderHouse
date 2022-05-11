const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
		type: String,
		unique: true,
	},
	description: String,
	code: String,
	image: String,
	price: Number,
	stock: Number,
	timestamp: Date,
});

module.exports = mongoose.model('products', productSchema);