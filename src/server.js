const express = require('express');
const app = express();
const productRouter = require('./routers/productRouter');
const cartRouter = require('./routers/cartRouter');
const denv = require('dotenv');
const dotenv = denv.config();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const server = require("http").Server(app);

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("./public"));

// Routers
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

// Server
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
server.on("error", (error) => console.log("Server Error\n\t", error));

// Mongoose

connect()

function connect() {
    mongoose.connect(process.env.MONGO_ATLAS_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 1000
        })
        .then(() => console.log('Conectado a la base de datos...'))
        .catch(error => console.log('Error al conectarse a la base de datos', error));
}