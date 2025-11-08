const yup = require('yup');

const createSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória')
});

const updateSchema = yup.object({
  nome: yup.string(),
  descricao: yup.string()
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
