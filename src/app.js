import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import dotenv from "dotenv";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { Server as SocketServer } from "socket.io";
import { connectDB } from "./config/db.js";
import swaggerConfig from './docs/swagger.js'

import ProductsManager from "./utils/ProductManager.js";
import CartManager from "./utils/CartManager.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

import configureSockets from "./socket/socketClient.js"; 

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new SocketServer(httpServer);

connectDB();

swaggerConfig(app);

const productsManager = new ProductsManager();
const cartManager = new CartManager();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.get("/", (req, res) => {
    res.redirect("/products");
});

app.get("/products", async (req, res) => {
    const result = await productsManager.getProducts();
    res.render("products", { products: result.docs });
});

app.get("/products/:id", async (req, res) => {
    const product = await productsManager.getById(req.params.id);
    if (!product) return res.status(404).send("Producto no encontrado");
    res.render("productDetail", { product });
});

app.get("/cart", async (req, res) => {
    const cart = await cartManager.getCart();
    res.render("cart", { cart });
});


configureSockets(io, productsManager, cartManager);


if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 8080;
    httpServer.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
}

export default app;



