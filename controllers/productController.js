const prisma = require('../prisma');

// GET /products
const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Terjadi kesalahan server'
        });
    }
};

// POST /products
const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;

        if (
            typeof name !== 'string' ||
            name.trim() === '' ||
            !Number.isFinite(price) ||
            price <= 0
        ) {
            return res.status(400).json({
                message: 'Nama dan harga produk tidak valid'
            });
        }

        const product = await prisma.product.create({
            data: {
                name: name.trim(),
                price: price
            }
        });

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Terjadi kesalahan server'
        });
    }
};

module.exports = {
    getAllProducts,
    createProduct
};