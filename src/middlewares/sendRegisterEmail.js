const sendEmail = require('../services/sendEmail');
const config = require('../config/config');

const sendRegisterEmail = async (req, res, next) => {
    const emailMessage = {
        from: {
            name: config.ETHEREAL_NAME,
            address: config.ETHEREAL_EMAIL
        },
        to: config.ETHEREAL_EMAIL,
        subject: `Nuevo Registro`,
        html: `
            <h1>Alerta de nuevo registro</h1>
            <p>${req.session.passport.user ? req.session.passport.user : 'Usuario'} se ha registrado en la plataforma.</p>
            `,
    }

    try {
        await sendEmail(emailMessage);
        next();

    } catch (err) {
        console.log('ERROR', err);
        res.status(500).json(err);
    }
};

module.exports = sendRegisterEmail;