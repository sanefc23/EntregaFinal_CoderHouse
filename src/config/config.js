const denv = require('dotenv');

denv.config();

module.exports = {
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL,
    ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD,
    ETHEREAL_NAME: process.env.ETHEREAL_NAME
};