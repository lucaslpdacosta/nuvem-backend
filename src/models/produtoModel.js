const db = require('../database/db');

class ProdutoModel {
  async getProdutos() {
    const query = 'SELECT * FROM produtos';
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getProdutoById(id) {
    const query = 'SELECT * FROM produtos WHERE id = ?';

    try {
      const [rows] = await db.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error('erro ao obter produto por id', error);
      throw new Error('erro');
    }
  }

  async getProdutosByName(nome) {
    try {
      const query = 'SELECT * FROM produtos WHERE nome LIKE ?';
      const [rows] = await db.query(query, [`%${nome}%`]);

      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('erro ao obter produto por nome');
    }
  }

  async createProduto(nome, valor, categoria, quantidade) {
    const query = 'INSERT INTO produtos (nome, valor, categoria, quantidade) VALUES (?, ?, ?, ?)';
    const values = [nome, valor, categoria, quantidade];

    try {
      const [result] = await db.query(query, values);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async updateProduto(id, nome, valor, categoria, quantidade) {
    const query = 'UPDATE produtos SET nome = ?, valor = ?, categoria = ?, quantidade = ? WHERE id = ?';
    const values = [nome, valor, categoria, quantidade, id];

    try {
      const [result] = await db.query(query, values);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduto(id) {
    const query = 'DELETE FROM produtos WHERE id = ?';
    const values = [id];

    try {
      const [result] = await db.query(query, values);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProdutoModel();