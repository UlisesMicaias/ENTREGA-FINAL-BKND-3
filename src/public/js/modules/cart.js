function renderCart(cart) {
    const container = document.getElementById("cartContainer");
    if (!container) return;
    container.innerHTML = "";
    cart.products.forEach((item) => {
        container.innerHTML += `
            <div class="cart-item">
                <h3>${item.product.title}</h3>
                <p>Cantidad: ${item.quantity}</p>
                <button class="remove-from-cart-btn" data-id="${item.product._id}">Eliminar del carrito</button>
            </div>
        `;
    });

    document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            socket.emit("removeFromCart", { productId });
        });
    });
}

window.renderCart = renderCart;



