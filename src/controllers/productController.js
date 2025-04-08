const Product = require('../models/Product');


const getProducts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const result = await Product.paginate({}, { page, limit });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};


const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const saved = await newProduct.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear producto', error });
    }
};

module.exports = { getProducts, createProduct };
