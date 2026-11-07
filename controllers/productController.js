// Data awal disimpan di array (tanpa database).
const products = [
  { id: 1, name: 'Buku', price: 15000 },
  { id: 2, name: 'Pulpen', price: 5000 }
];

// GET /products
function getAllProducts(req, res) {
  return res.status(200).json(products);
}

// GET /products/:id
function getProductById(req, res) {
  const id = Number(req.params.id);

  // Pastikan ID berupa bilangan bulat positif.
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'ID produk harus berupa bilangan bulat positif'
    });
  }

  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      message: 'Produk tidak ditemukan'
    });
  }

  return res.status(200).json(product);
}

// POST /products
function createProduct(req, res) {
  const { name, price } = req.body;

  // Validasi input.
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      message: 'Nama produk wajib diisi dengan teks'
    });
  }

  if (price === undefined || price === null || price === '' ||
      !Number.isFinite(Number(price)) || Number(price) <= 0) {
    return res.status(400).json({
      message: 'Harga produk harus berupa angka lebih dari 0'
    });
  }

  // ID baru dibuat dari ID terbesar + 1.
  const newId = products.length > 0
    ? Math.max(...products.map((item) => item.id)) + 1
    : 1;

  const newProduct = {
    id: newId,
    name: name.trim(),
    price: Number(price)
  };

  products.push(newProduct);

  return res.status(201).json({
    message: 'Produk berhasil ditambahkan',
    data: newProduct
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct
};
