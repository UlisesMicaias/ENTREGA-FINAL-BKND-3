export default function configureSockets(io, productsManager, cartManager) {
    io.on("connection", (socket) => {
        console.log("Cliente conectado", socket.id);


        productsManager.getProducts()
            .then(result => socket.emit("products", result.docs))
            .catch(() => socket.emit("error", "No se pudo cargar la lista de productos"));

        socket.on("addProduct", async (data) => {
            try {
                await productsManager.addProduct(data);
                const result = await productsManager.getProducts();
                io.emit("products", result.docs);
                socket.emit("success", "Producto agregado correctamente");
            } catch {
                socket.emit("error", "No se pudo agregar el producto");
            }
        });

        socket.on("deleteProduct", async (id) => {
            try {
                await productsManager.deleteProduct(id);
                const result = await productsManager.getProducts();
                io.emit("products", result.docs);
                socket.emit("success", "Producto borrado correctamente");
            } catch {
                socket.emit("error", "No se pudo borrar el producto");
            }
        });

        socket.on("updateProduct", async (updatedProduct) => {
            try {
                await productsManager.updateProduct(updatedProduct.id, updatedProduct);
                const result = await productsManager.getProducts();
                io.emit("products", result.docs);
                socket.emit("success", "Producto actualizado correctamente");
            } catch {
                socket.emit("error", "No se pudo actualizar el producto");
            }
        });

        socket.on("addToCart", async ({ productId }) => {
            try {
                await cartManager.addProduct(productId);
                const cart = await cartManager.getCart();
                io.emit("cartUpdated", cart);
                socket.emit("success", "Producto agregado al carrito");
            } catch {
                socket.emit("error", "No se pudo agregar al carrito");
            }
        });

        socket.on("removeFromCart", async ({ productId }) => {
            try {
                await cartManager.removeProduct(productId);
                const cart = await cartManager.getCart();
                io.emit("cartUpdated", cart);
                socket.emit("success", "Producto eliminado del carrito");
            } catch {
                socket.emit("error", "No se pudo quitar del carrito");
            }
        });
    });
}
