const produtoModel = require('../models/produtoModel');

class ProdutoController {
  async getProdutos(req, res) {
    try {
      const produtos = await produtoModel.getProdutos();
      res.json(produtos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async getProdutoById(req, res) {
    try {
      const produto = await produtoModel.getProdutoById(req.params.id);

      if (!produto) {
        return res.status(404).json({ error: 'produto nao encontrado' });
      }

      res.status(200).json(produto);
    } catch (error) {
      console.error('erro ao obter produto', error);
      res.status(500).json({ error: 'erro' });
    }
  }

  async getProdutosByName(req, res) {
    const nome = req.query.nome;
    try {
      const produtos = await produtoModel.getProdutosByName(nome);
      return res.json(produtos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  async createProduto(req, res) {
    const { nome, valor, categoria, quantidade } = req.body;

    try {
      const produtoId = await produtoModel.createProduto(nome, valor, categoria, quantidade);
      const produto = await produtoModel.getProdutoById(produtoId);
      res.status(201).json(produto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateProduto(req, res) {
    const { id } = req.params;
    const { nome, valor, categoria, quantidade } = req.body;

    try {
      const success = await produtoModel.updateProduto(id, nome, valor, categoria, quantidade);

      if (success) {
        const produto = await produtoModel.getProdutoById(id);
        res.json(produto);
      } else {
        res.status(404).json({ error: 'produto nao encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProduto(req, res) {
    const { id } = req.params;

    try {
      const success = await produtoModel.deleteProduto(id);

      if (success) {
        res.json({ message: 'produto deletado' });
      } else {
        res.status(404).json({ error: 'produto nao encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProdutoController();