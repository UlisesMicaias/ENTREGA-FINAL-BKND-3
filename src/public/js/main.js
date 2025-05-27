const socket = io();

socket.on('products', (updatedProducts) => {
    if (window.renderProducts) {
        window.renderProducts(updatedProducts);
    }
});

socket.on('cartUpdated', (updatedCart) => {
    if (window.renderCart) {
        window.renderCart(updatedCart);
    }
});

socket.on('success', (msg) => alert(msg));
socket.on('error', (msg) => alert(msg));

