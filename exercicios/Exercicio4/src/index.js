require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use('/api', routes);

// Error handler middleware (simples)
app.use((err, req, res, next) => {
  if (err && err.name === 'ValidationError' && err.errors) {
    return res.status(400).json({ errors: err.errors });
  }
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
if (!DB_USER || !DB_PASS || !DB_HOST || !DB_NAME) {
  console.error('Por favor configure as variáveis de ambiente no .env');
  process.exit(1);
}

const uri = `mongodb+srv://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASS)}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB Atlas');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(err => {
    console.error('Erro ao conectar no MongoDB:', err.message);
    process.exit(1);
  });
