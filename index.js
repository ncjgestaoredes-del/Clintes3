const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO DO BANCO DE DADOS (AlwaysData)
const db = mysql.createPool({
  host: 'mysql-albertocossa.alwaysdata.net',
  user: '430726',
  password: 'Acossa@824018',
  database: 'albertocossa_sistema',
  port:'3306',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
/*
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
createPool*/







db.connect(err => {
  if (err) console.error("Erro MySQL:", err);
  else console.log("MySQL conectado");
});

// cadastrar cliente
app.post("/clientes", (req, res) => {
  const { nome, email, telefone } = req.body;

  const sql = "INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)";
  db.query(sql, [nome, email, telefone], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Cliente cadastrado com sucesso" });
  });
});

// listar clientes
app.get("/clientes", (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = app;
