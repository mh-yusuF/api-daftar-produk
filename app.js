const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

// Middleware untuk membaca request body berformat JSON.
app.use(express.json());

// Menggunakan seluruh route produk dengan prefix /products.
app.use('/products', productRoutes);

// Menangani request ke endpoint yang tidak tersedia.
app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint tidak ditemukan'
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
