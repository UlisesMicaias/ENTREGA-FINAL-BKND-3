const socket = io();
const form = document.getElementById('addProductForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
        title: form.title.value,
        artist: form.artist.value,
        genre: form.genre.value,
        year: Number(form.year.value),
        price: Number(form.price.value),
        stock: Number(form.stock.value),
        image: form.image.value,
    };
    socket.emit('addProduct', data);
    form.reset();
});

socket.on('error', (msg) => {
    alert(msg);
});
