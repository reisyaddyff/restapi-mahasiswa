const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kampus',
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.log("Koneksi gagal:", err);
    } else {
        console.log("MySQL Connected");
    }
});

app.get('/mahasiswa', (req, res) => {
    db.query("SELECT * FROM mahasiswa", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/mahasiswa', (req, res) => {
    const { nama, nim, domisili } = req.body;

    const sql = "INSERT INTO mahasiswa (nama, nim, domisili) VALUES (?, ?, ?)";
    db.query(sql, [nama, nim, domisili], (err, result) => {
        if (err) throw err;
        res.json({ message: "Data berhasil ditambahkan" });
    });
});

app.listen(3000, () => {
    console.log("Server jalan di http://localhost:3000");
});