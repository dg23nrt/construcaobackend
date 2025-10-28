const mongoose = require('mongoose')

// Middleware para validar o formato do ID
function validarID(req, res, next) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ erro: 'ID inválido' })
  }

  next()
}

module.exports = validarID
