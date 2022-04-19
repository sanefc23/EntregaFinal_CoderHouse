const { v4: uuidv4 } = require('uuid');

class Cart {
    constructor() {
        this.timestamp = Date.now();
        this.products = [];
    }
}

module.exports = Cart;