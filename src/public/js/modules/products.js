function renderProducts(products) {
    const container = document.getElementById("productsContainer");
    if (!container) return;
    container.innerHTML = "";
    products.forEach((product) => {
        container.innerHTML += `
            <div class="product">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>$${product.price}</p>
                <button class="add-to-cart-btn" data-id="${product._id}">Agregar al carrito</button>
                <button class="delete-product-btn" data-id="${product._id}">Eliminar</button>
            </div>
        `;
    });

    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            socket.emit("addToCart", { productId });
        });
    });

    document.querySelectorAll(".delete-product-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            socket.emit("deleteProduct", productId);
        });
    });
}

window.renderProducts = renderProducts;


