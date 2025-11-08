const express = require('express');
const Funcionario = require('../models/FuncionarioModel');
const Cargo = require('../models/CargoModel');
const Departamento = require('../models/DepartamentoModel');
const { validateCreate, validateUpdate } = require('../validators/FuncionarioValidator');
const validarId = require('../validators/IDValidator');

const router = express.Router();

router.post('/', validateCreate, async (req, res) => {
  try {
    // validar se cargo e departamento existem
    const { cargo, departamento } = req.body;
    const cargoExists = await Cargo.findById(cargo);
    const depExists = await Departamento.findById(departamento);
    if (!cargoExists) return res.status(404).json({ error: 'Cargo não encontrado' });
    if (!depExists) return res.status(404).json({ error: 'Departamento não encontrado' });

    const f = await Funcionario.create(req.body);
    const populated = await Funcionario.findById(f._id).populate(['cargo','departamento']);
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const funcionarios = await Funcionario.find().populate(['cargo','departamento']);
    res.json(funcionarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', validarId, async (req, res) => {
  try {
    const f = await Funcionario.findById(req.params.id).populate(['cargo','departamento']);
    if (!f) return res.status(404).json({ error: 'Funcionário não encontrado' });
    res.json(f);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', validarId, validateUpdate, async (req, res) => {
  try {
    // se tentou atualizar cargo/departamento, verificar existência
    if (req.body.cargo) {
      const cargoExists = await Cargo.findById(req.body.cargo);
      if (!cargoExists) return res.status(404).json({ error: 'Cargo não encontrado' });
    }
    if (req.body.departamento) {
      const depExists = await Departamento.findById(req.body.departamento);
      if (!depExists) return res.status(404).json({ error: 'Departamento não encontrado' });
    }

    const f = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate(['cargo','departamento']);
    if (!f) return res.status(404).json({ error: 'Funcionário não encontrado' });
    res.json(f);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', validarId, async (req, res) => {
  try {
    const f = await Funcionario.findByIdAndDelete(req.params.id);
    if (!f) return res.status(404).json({ error: 'Funcionário não encontrado' });
    res.json({ message: 'Funcionário removido' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
