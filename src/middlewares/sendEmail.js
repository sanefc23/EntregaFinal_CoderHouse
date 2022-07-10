const nodemailer = require('nodemailer');
const config = require('../config/config');

const sendEmail = async (req, res, next) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: config.ETHEREAL_EMAIL,
            pass: config.ETHEREAL_PASSWORD
        }
    });

    const message = {
        from: {
            name: config.ETHEREAL_NAME,
            address: config.ETHEREAL_EMAIL
        },
        to: config.ETHEREAL_EMAIL,
        subject: `Nuevo Registro`,
        html: `
            <h1>Alerta de nuevo registro</h1>
            <p>${req.session.passport.user} se ha registrado en la plataforma.</p>
            `,
    }

    try {
        const response = await transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
        });
        next();

    } catch (err) {
        console.log('ERROR', err);
        res.status(500).json(err);
    }
};

module.exports = sendEmail;