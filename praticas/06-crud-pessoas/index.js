// Crio a aplicação express
const express = require('express')
const app = express()

app.use(express.json())

// conectar no MongoDB
const mongoose = require('mongoose')
require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
  .then(() => {
    console.log("Conectado ao banco MongoDB!!!!")
  })
  .catch(erro => {
    console.log("Erro ao conectar no banco MongoDB: ", erro)
  })

// Model (Modelo) - Interface com o meu banco de dados
// Cada model representa uma Collection (Tabela)
const PessoaModel = mongoose.model('Pessoas', new mongoose.Schema(
  {
    nome: String,
    idade: Number,
    dataCriacao: { type: Date, default: Date.now() }
  }
))

// CRUD
// Create
app.post('/pessoas', async (req, res, next) => {
  const pessoa = req.body
  if (!pessoa.nome || !pessoa.idade) {
    return res.status(400).json({ erro: "Campos nome e idade são obrigatórios!" })
  }
  const pessoaCriada = await PessoaModel.create(pessoa)
  res.status(201).json(pessoaCriada)
})

//READ
app.get('/pessoas', async (req, res, next) => {
  const pessoas = await PessoaModel.find()
  res.json(pessoas)
})

app.listen(3000, () => {
  console.log("Aplicação rodando em http://localhost:3000")
})