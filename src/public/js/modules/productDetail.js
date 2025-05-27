const socket = io();
const updateStockBtn = document.getElementById('updateStockBtn');
const stockInput = document.getElementById('stockInput');

updateStockBtn.addEventListener('click', () => {
    const newStock = Number(stockInput.value);
    if (newStock < 0) {
        alert('Stock inválido');
        return;
    }
    const updatedProduct = {
        id: updateStockBtn.dataset.id,
        stock: newStock,
    };
    socket.emit('updateProduct', updatedProduct);
});

socket.on('error', (msg) => {
    alert(msg);
});
