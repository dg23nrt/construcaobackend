const express = require('express');
const Tarefa = require('../models/TarefaModel');
const Projeto = require('../models/ProjetoModel');
const Funcionario = require('../models/FuncionarioModel');
const { validateCreate, validateUpdate } = require('../validators/TarefaValidator');
const validarId = require('../validators/IDValidator');

const router = express.Router();

router.post('/', validateCreate, async (req, res) => {
  try {
    const { responsavel, projeto } = req.body;
    const fExists = await Funcionario.findById(responsavel);
    const pExists = await Projeto.findById(projeto);
    if (!fExists) return res.status(404).json({ error: 'Funcionário responsável não encontrado' });
    if (!pExists) return res.status(404).json({ error: 'Projeto não encontrado' });

    const t = await Tarefa.create(req.body);
    const populated = await Tarefa.findById(t._id).populate(['responsavel','projeto']);
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tarefas = await Tarefa.find().populate(['responsavel','projeto']);
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', validarId, async (req, res) => {
  try {
    const t = await Tarefa.findById(req.params.id).populate(['responsavel','projeto']);
    if (!t) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.json(t);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', validarId, validateUpdate, async (req, res) => {
  try {
    if (req.body.responsavel) {
      const fExists = await Funcionario.findById(req.body.responsavel);
      if (!fExists) return res.status(404).json({ error: 'Funcionário responsável não encontrado' });
    }
    if (req.body.projeto) {
      const pExists = await Projeto.findById(req.body.projeto);
      if (!pExists) return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    const t = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate(['responsavel','projeto']);
    if (!t) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.json(t);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', validarId, async (req, res) => {
  try {
    const t = await Tarefa.findByIdAndDelete(req.params.id);
    if (!t) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.json({ message: 'Tarefa removida' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
