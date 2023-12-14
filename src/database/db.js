const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'k8shomolog.mysql.database.azure.com',
  user: 'lucaslpdacosta',
  password: 'Uca#Rnp!2010',
  database: 'crud_homolog',
  port: 3306,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    valor FLOAT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL
  );
`, (err, result) => {
  if (err) {
    console.error('erro ao criar tabela', err);
  } else {
    console.log('tabela criada');
  }
});

module.exports = pool.promise();