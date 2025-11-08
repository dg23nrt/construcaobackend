const express = require('express');
const Cargo = require('../models/CargoModel');
const { validateCreate, validateUpdate } = require('../validators/CargoValidator');
const validarId = require('../validators/IDValidator');

const router = express.Router();

router.post('/', validateCreate, async (req, res) => {
  try {
    const cargo = await Cargo.create(req.body);
    res.status(201).json(cargo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const cargos = await Cargo.find();
    res.json(cargos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', validarId, async (req, res) => {
  try {
    const cargo = await Cargo.findById(req.params.id);
    if (!cargo) return res.status(404).json({ error: 'Cargo não encontrado' });
    res.json(cargo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', validarId, validateUpdate, async (req, res) => {
  try {
    const cargo = await Cargo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cargo) return res.status(404).json({ error: 'Cargo não encontrado' });
    res.json(cargo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', validarId, async (req, res) => {
  try {
    const cargo = await Cargo.findByIdAndDelete(req.params.id);
    if (!cargo) return res.status(404).json({ error: 'Cargo não encontrado' });
    res.json({ message: 'Cargo removido' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
