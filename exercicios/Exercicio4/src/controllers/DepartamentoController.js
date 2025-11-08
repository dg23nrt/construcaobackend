const express = require('express');
const Departamento = require('../models/DepartamentoModel');
const { validateCreate, validateUpdate } = require('../validators/DepartamentoValidator');
const validarId = require('../validators/IDValidator');

const router = express.Router();

router.post('/', validateCreate, async (req, res) => {
  try {
    const dep = await Departamento.create(req.body);
    res.status(201).json(dep);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const deps = await Departamento.find();
    res.json(deps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', validarId, async (req, res) => {
  try {
    const dep = await Departamento.findById(req.params.id);
    if (!dep) return res.status(404).json({ error: 'Departamento não encontrado' });
    res.json(dep);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', validarId, validateUpdate, async (req, res) => {
  try {
    const dep = await Departamento.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!dep) return res.status(404).json({ error: 'Departamento não encontrado' });
    res.json(dep);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', validarId, async (req, res) => {
  try {
    const dep = await Departamento.findByIdAndDelete(req.params.id);
    if (!dep) return res.status(404).json({ error: 'Departamento não encontrado' });
    res.json({ message: 'Departamento removido' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
