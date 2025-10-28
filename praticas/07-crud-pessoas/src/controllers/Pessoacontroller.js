const express = require('express')
const router = express.Router()
// importo o modelo
const PessoaModel = require('../models/PessoaModel')

// importo os validadores

// Rotas
// Cadastro
router.post('/pessoas', async (req, res, next) => {
  const dados = req.body
  const pessoaCadastrada = await PessoaModel.create(dados)
  res.status(201).json(pessoaCadastrada)
})

// Leitura
router.get('/pessoas', async (req, res, next) => {
  const pessoas = await PessoaModel.find()
  res.json(pessoas)
})

router.get('/pessoas/:id', async (req, res, next) => {
  const pessoaEcontrada = await PessoaModel.findById(req.params.id)
  if (!pessoaEcontrada) {
    return res.status(404).json({ erro: "Pessoa não econtrada!" })
  }
  res.json(pessoaEcontrada)
})

// Atualização
router.put('/pessoas/:id', async (req, res, next) => {
  const id = req.params.id
  const novosDados = req.body
  const pessoaAtualizada = await PessoaModel.findByIdAndUpdate(id, novosDados, { new: true })
  if (!pessoaAtualizada) {
    return res.status(404).json({ erro: "Pessoa não econtrada!" })
  }
  res.json(pessoaAtualizada)
})

// Exclusão
router.delete('/pessoas/:id', async (req, res, next) => {
  const id = req.params.id
  await PessoaModel.findByIdAndDelete(id)
  res.status(204).send()
})



module.exports = router