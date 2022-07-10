const denv = require('dotenv');

denv.config();

module.exports = {
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL,
    ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD,
    ETHEREAL_NAME: process.env.ETHEREAL_NAME,
    TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_NUMBER: process.env.TWILIO_NUMBER
};