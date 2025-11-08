const yup = require('yup');
const mongoose = require('mongoose');

const createSchema = yup.object({
  titulo: yup.string().required('Título é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),
  data_inicio: yup.date().required('Data início é obrigatória'),
  data_fim: yup.date().required('Data fim é obrigatória').test('is-after', 'Data fim deve ser posterior à data início', function(value) {
    const { data_inicio } = this.parent;
    if (!data_inicio || !value) return true;
    return new Date(value) > new Date(data_inicio);
  }),
  responsavel: yup.string().required('Responsável é obrigatório').test('is-objectid', 'Responsável inválido', v => mongoose.Types.ObjectId.isValid(v)),
  projeto: yup.string().required('Projeto é obrigatório').test('is-objectid', 'Projeto inválido', v => mongoose.Types.ObjectId.isValid(v))
});

const updateSchema = yup.object({
  titulo: yup.string(),
  descricao: yup.string(),
  data_inicio: yup.date(),
  data_fim: yup.date().test('is-after', 'Data fim deve ser posterior à data início', function(value) {
    const { data_inicio } = this.parent;
    if (!data_inicio || !value) return true;
    return new Date(value) > new Date(data_inicio);
  }),
  responsavel: yup.string().test('is-objectid', 'Responsável inválido', v => !v || mongoose.Types.ObjectId.isValid(v)),
  projeto: yup.string().test('is-objectid', 'Projeto inválido', v => !v || mongoose.Types.ObjectId.isValid(v))
});

function validateCreate(req, res, next) {
  createSchema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => res.status(400).json({ errors: err.errors }));
}

function validateUpdate(req, res, next) {
  updateSchema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => res.status(400).json({ errors: err.errors }));
}

module.exports = { validateCreate, validateUpdate };
