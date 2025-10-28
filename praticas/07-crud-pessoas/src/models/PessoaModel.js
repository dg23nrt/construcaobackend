const mongoose = require('mongoose')
// schema
const schema = new mongoose.Schema(
  // estrutura do registro
  {
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    genero: { type: String, required: true },
    endereco: {
      cep: String,
      logradouro: String,
      complemento: String,
      bairro: String,
      numero: String,
      uf: String
    }
  },
  // parametros
  {
    timestamps: true
  }
)

// modelo
const PessoaModel = mongoose.model('Pessoas', schema)

// exportar o modelo
module.exports = PessoaModel