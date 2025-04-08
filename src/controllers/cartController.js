const Cart = require('../models/Cart');
const Product = require('../models/Product');


const createCart = async (req, res) => {
    try {
        const newCart = new Cart();
        const saved = await newCart.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear carrito', error });
    }
};


const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await Cart.findById(cid);
        const product = await Product.findById(pid);
        if (!cart || !product) {
            return res.status(404).json({ message: 'Carrito o producto no encontrado' });
        }

        const existing = cart.products.find(p => p.product.toString() === pid);
        if (existing) {
            existing.quantity++;
        } else {
            cart.products.push({ product: pid });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar producto al carrito', error });
    }
};

module.exports = { createCart, addProductToCart };
