const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const productRouter = require('./routers/productRouter');
const cartRouter = require('./routers/cartRouter');
const userRouter = require('./routers/userRouter');
const denv = require('dotenv');
const dotenv = denv.config();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const server = require("http").Server(app);
const MongoStore = require("connect-mongo")
const passport = require('passport');
const flash = require('connect-flash');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("./public"));
app.use(cookieParser());
app.use(flash());

// Server
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
server.on("error", (error) => console.log("Server Error\n\t", error));

// --- Session ---
const sessionOptions = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_ATLAS_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: 's3cr3t0',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 60 * 1000
    }
}

app.use(session(sessionOptions));

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());
app.use(function (err, req, res, next) {
    console.log(err);
});

// Routers
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);

// MONGOSE
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