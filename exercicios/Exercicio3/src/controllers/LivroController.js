const express = require('express')
const router = express.Router()
const Livro = require('../models/Livro')
const { validarLivro, validarAtualizacao } = require('../validators/LivroValidator')
const validarID = require('../validators/IDValidator')

// CREATE
router.post('/', validarLivro, async (req, res) => {
  try {
    const novoLivro = await Livro.create(req.body)
    res.status(201).json(novoLivro)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar livro' })
  }
})

// READ - listar todos
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.find()
    res.json(livros)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar livros' })
  }
})

// READ - buscar por ID
router.get('/:id', validarID, async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id)
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' })
    res.json(livro)
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar livro' })
  }
})

// UPDATE
router.put('/:id', validarID, validarAtualizacao, async (req, res) => {
  try {
    const livroAtualizado = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!livroAtualizado) return res.status(404).json({ erro: 'Livro não encontrado' })
    res.json(livroAtualizado)
  } catch {
    res.status(500).json({ erro: 'Erro ao atualizar livro' })
  }
})

// DELETE
router.delete('/:id', validarID, async (req, res) => {
  try {
    const livroRemovido = await Livro.findByIdAndDelete(req.params.id)
    if (!livroRemovido) return res.status(404).json({ erro: 'Livro não encontrado' })
    res.json({ mensagem: 'Livro removido com sucesso' })
  } catch {
    res.status(500).json({ erro: 'Erro ao remover livro' })
  }
})

module.exports = router
