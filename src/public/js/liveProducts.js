const socket = io();

const productForm = document.querySelector('#add-product-form');
if (productForm) {
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const newProd = {
            title: form.title.value.trim(),
            price: Number(form.price.value)
        };
        console.log("Enviando producto:", newProd);
        socket.emit('addProduct', newProd);
        form.reset();
    });
}

function deleteProduct(id) {
    socket.emit('deleteProduct', id);
}

socket.on('productAdded', (prod) => {
    console.log("Producto agregado:", prod);
    const list = document.querySelector('#products-live');
    if (list) {
        const item = document.createElement('li');
        item.dataset.id = prod._id;
        item.innerHTML = `${prod.title} - $${prod.price} <button onclick="deleteProduct('${prod._id}')">Eliminar</button>`;
        list.appendChild(item);
    }
});

socket.on('productDeleted', (id) => {
    console.log("Producto eliminado:", id);
    const element = document.querySelector(`li[data-id="${id}"]`);
    if (element) {
        element.remove();
    }
});
