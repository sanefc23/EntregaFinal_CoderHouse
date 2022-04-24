const express = require('express');
const app = express();
const productRouter = require('./routers/productRouter');
const cartRouter = require('./routers/cartRouter');
const PORT = process.env.PORT || 8080;
const server = require("http").Server(app);

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("./public"));
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
server.on("error", (error) => console.log("Server Error\n\t", error));