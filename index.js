const express = require('express');
const cors = require('cors');
const app = express();

const produtoRoutes = require('./src/routes/produtoRoutes');

app.use(express.json());
app.use(cors());
app.use('/', produtoRoutes);

app.listen(3000, () => {
  console.log('servidor rodando na porta 3000');
});