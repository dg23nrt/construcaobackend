const yup = require('yup')

// Schema para criar novo livro
const livroSchema = yup.object({
  titulo: yup.string().required('Título é obrigatório'),
  autor: yup.string().required('Autor é obrigatório'),
  editora: yup.string().required('Editora é obrigatória'),
  ano: yup.number().typeError('Ano deve ser numérico').required('Ano é obrigatório'),
  preco: yup.number().typeError('Preço deve ser numérico').positive('Preço deve ser positivo').required('Preço é obrigatório')
})

// Schema para atualização (campos opcionais)
const livroUpdateSchema = yup.object({
  titulo: yup.string(),
  autor: yup.string(),
  editora: yup.string(),
  ano: yup.number().typeError('Ano deve ser numérico'),
  preco: yup.number().typeError('Preço deve ser numérico').positive('Preço deve ser positivo')
})

// Middleware de validação
function validarLivro(req, res, next) {
  livroSchema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err) => res.status(400).json({ erros: err.errors }))
}

function validarAtualizacao(req, res, next) {
  livroUpdateSchema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err) => res.status(400).json({ erros: err.errors }))
}

module.exports = { validarLivro, validarAtualizacao }
