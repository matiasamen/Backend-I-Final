console.log("🧨 ESTE ES EL app.js ahora sii pude");

const express = require('express');
const path = require('path');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const connectDB = require('./config/db');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const Product = require('./models/Product');

const app = express();
const PORT = 8080;


connectDB();

const server = app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});

const io = new Server(server);


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.get('/liveproducts', async (req, res) => {
    console.log("🔥 Entrando a /liveproducts");
    try {
        const products = await Product.find().lean();
        res.render('liveProducts', {
            title: 'Productos en Vivo',
            products
        });
    } catch (error) {
        console.error("Error en /liveproducts:", error);
        res.status(500).send('Error al cargar productos');
    }
});



io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('addProduct', async (data) => {
        const newProduct = new Product(data);
        await newProduct.save();
        io.emit('productAdded', newProduct);
    });

    socket.on('deleteProduct', async (id) => {
        await Product.findByIdAndDelete(id);
        io.emit('productDeleted', id);
    });
});

module.exports = app;
