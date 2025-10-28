const mongoose = require('mongoose')

const LivroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editora: { type: String, required: true },
  ano: { type: Number, required: true },
  preco: { type: Number, required: true, min: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Livro', LivroSchema)
