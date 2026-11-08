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

// PUT /products/:id
const updateProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, price } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'ID produk tidak valid'
            });
        }

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

        const product = await prisma.product.update({
            where: { id: id },
            data: {
                name: name.trim(),
                price: price
            }
        });

        res.status(200).json(product);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                message: 'Produk tidak ditemukan'
            });
        }

        console.error(error);
        res.status(500).json({
            message: 'Terjadi kesalahan server'
        });
    }
};

// DELETE /products/:id
const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'ID produk tidak valid'
            });
        }

        await prisma.product.delete({
            where: { id: id }
        });

        res.status(200).json({
            message: 'Produk berhasil dihapus'
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                message: 'Produk tidak ditemukan'
            });
        }

        console.error(error);
        res.status(500).json({
            message: 'Terjadi kesalahan server'
        });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};