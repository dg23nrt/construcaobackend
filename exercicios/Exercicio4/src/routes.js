const express = require('express');
const DepartamentoController = require('./controllers/DepartamentoController');
const CargoController = require('./controllers/CargoController');
const FuncionarioController = require('./controllers/FuncionarioController');
const ProjetoController = require('./controllers/ProjetoController');
const TarefaController = require('./controllers/TarefaController');

const router = express.Router();

router.use('/departamentos', DepartamentoController);
router.use('/cargos', CargoController);
router.use('/funcionarios', FuncionarioController);
router.use('/projetos', ProjetoController);
router.use('/tarefas', TarefaController);

module.exports = router;
