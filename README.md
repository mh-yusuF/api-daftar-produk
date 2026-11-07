# API Daftar Produk

REST API sederhana menggunakan ExpressJS. Data disimpan sementara di dalam array JavaScript, tanpa database.

## 1. Persyaratan

- Node.js dan npm sudah terpasang.
- Terminal (PowerShell, CMD, atau terminal VS Code).

Periksa instalasi:

```bash
node -v
npm -v
```

## 2. Instalasi dan menjalankan server

Masuk ke folder proyek, lalu jalankan:

```bash
npm install
npm run dev
```

Alternatif menjalankan tanpa mode watch:

```bash
npm start
```

Jika berhasil, terminal menampilkan:

```text
Server berjalan di http://localhost:3000
```

## 3. Daftar endpoint

| Method | Endpoint | Fungsi | Status sukses |
|---|---|---|---|
| GET | `/products` | Mengambil semua produk | 200 OK |
| GET | `/products/:id` | Mengambil produk berdasarkan ID | 200 OK |
| POST | `/products` | Menambahkan produk | 201 Created |

Endpoint yang tidak ditemukan mengembalikan status `404 Not Found`.

## 4. Data awal

```json
[
  { "id": 1, "name": "Buku", "price": 15000 },
  { "id": 2, "name": "Pulpen", "price": 5000 }
]
```

## 5. Pengujian API

Gunakan Postman, Thunder Client, atau REST Client.

### A. GET seluruh produk

- Method: `GET`
- URL: `http://localhost:3000/products`

Hasil yang diharapkan: status `200 OK` dan array berisi dua produk awal.

### B. GET produk berdasarkan ID

- Method: `GET`
- URL: `http://localhost:3000/products/1`

Hasil yang diharapkan: status `200 OK` dan objek produk Buku.

### C. GET produk yang tidak ditemukan

- Method: `GET`
- URL: `http://localhost:3000/products/999`

Hasil yang diharapkan: status `404 Not Found` dengan JSON:

```json
{
  "message": "Produk tidak ditemukan"
}
```

### D. POST menambahkan produk

- Method: `POST`
- URL: `http://localhost:3000/products`
- Header: `Content-Type: application/json`
- Body: pilih `raw` lalu `JSON`.

Contoh body:

```json
{
  "name": "Penghapus",
  "price": 3000
}
```

Hasil yang diharapkan: status `201 Created`. Produk baru memiliki ID 3.

Contoh respons:

```json
{
  "message": "Produk berhasil ditambahkan",
  "data": {
    "id": 3,
    "name": "Penghapus",
    "price": 3000
  }
}
```

Setelah POST berhasil, lakukan GET `/products` untuk memastikan produk baru masuk ke array.

### E. Pengujian validasi POST (tambahan)

Coba kirim body berikut:

```json
{
  "name": "",
  "price": -1000
}
```

Hasil yang diharapkan: status `400 Bad Request`, karena nama kosong dan harga tidak valid.

## 6. Penjelasan pemisahan route dan controller

- **Route** menentukan method HTTP dan URL, kemudian menghubungkannya ke fungsi controller.
- **Controller** menjalankan logika API, seperti membaca data, mencari produk, memvalidasi input, dan menambahkan produk.
- **app.js** mengatur middleware, memasang route, dan menjalankan server.

Pemisahan ini membuat kode lebih terstruktur dan memudahkan pengembangan endpoint berikutnya.

## 7. Catatan penyimpanan data

Data hanya disimpan di array selama server berjalan. Jika server dihentikan atau dimulai ulang, produk yang ditambahkan melalui POST akan hilang dan data kembali ke kondisi awal. Hal ini sesuai dengan instruksi tugas yang tidak menggunakan database.
