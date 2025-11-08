const mongoose = require('mongoose');

function validarIdParam(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  next();
}

module.exports = validarIdParam;
