const express = require('express');
const Projeto = require('../models/ProjetoModel');
const { validateCreate, validateUpdate } = require('../validators/ProjetoValidator');
const validarId = require('../validators/IDValidator');

const router = express.Router();

router.post('/', validateCreate, async (req, res) => {
  try {
    const p = await Projeto.create(req.body);
    res.status(201).json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const projetos = await Projeto.find();
    res.json(projetos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', validarId, async (req, res) => {
  try {
    const p = await Projeto.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', validarId, validateUpdate, async (req, res) => {
  try {
    const p = await Projeto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!p) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', validarId, async (req, res) => {
  try {
    const p = await Projeto.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json({ message: 'Projeto removido' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
