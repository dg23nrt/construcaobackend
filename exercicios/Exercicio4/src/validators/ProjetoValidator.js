const yup = require('yup');

const createSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),
  data_inicio: yup.date().required('Data início é obrigatória'),
  data_fim: yup.date().required('Data fim é obrigatória')
    .test('is-after', 'Data fim deve ser posterior à data início', function(value) {
      const { data_inicio } = this.parent;
      if (!data_inicio || !value) return true; // outros validators cuidarão da obrigatoriedade
      return new Date(value) > new Date(data_inicio);
    })
});

const updateSchema = yup.object({
  nome: yup.string(),
  descricao: yup.string(),
  data_inicio: yup.date(),
  data_fim: yup.date().test('is-after', 'Data fim deve ser posterior à data início', function(value) {
    const { data_inicio } = this.parent;
    if (!data_inicio || !value) return true;
    return new Date(value) > new Date(data_inicio);
  })
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
