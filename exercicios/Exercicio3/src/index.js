require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

// Importa o controller (caminho corrigido)
const livroController = require('./controllers/LivroController')
app.use('/livros', livroController)

// Conexão com MongoDB Atlas
const DB_HOST = process.env.DB_HOST || 'backend.ix5v0qt.mongodb.net'
const DB_USER = process.env.DB_USER || 'rhaynerdepaiva'
const DB_PASS = process.env.DB_PASS || 'rhayner123'
const DB_NAME = process.env.DB_NAME || 'BACKEND'

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(url)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.error('❌ Erro na conexão:', err))

// Inicia o servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Aplicação rodando -> http://localhost:${PORT}`)
})
