"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productRepository_1 = require("../repositories/productRepository");
const api_error_1 = require("../helpers/api-error");
const categorieRepository_1 = require("../repositories/categorieRepository");
const orderProductRepositosy_1 = require("../repositories/orderProductRepositosy");
class ProductController {
    async create(req, res) {
        const { description, amount, value, categorie_id } = req.body;
        if (!description || !amount || !value || !categorie_id) {
            throw new api_error_1.BadRequestError('Todos os campos são obrigatórios');
        }
        const categorie = await categorieRepository_1.categorieRepository.findOneBy({ id: categorie_id });
        if (!categorie) {
            throw new api_error_1.NotFoundError('Categoria não encontrada');
        }
        const newProduct = productRepository_1.productRepository.create({
            description,
            amount,
            categorie: categorie_id,
            value
        });
        await productRepository_1.productRepository.save(newProduct);
        res.status(201).json({ ...newProduct });
    }
    async getProduct(req, res) {
        const products = await productRepository_1.productRepository.find({
            relations: {
                categorie: true
            }
        });
        res.status(200).json(products);
    }
    async getProductById(req, res) {
        const { id } = req.params;
        const product = await productRepository_1.productRepository.findOne({
            where: { id: Number(id) },
            relations: { categorie: true }
        });
        if (!product) {
            throw new api_error_1.NotFoundError('Produto não encontrado');
        }
        res.status(200).json(product);
    }
    async putProduct(req, res) {
        const { id } = req.params;
        const { description, amount, value, categorie_id } = req.body;
        if (!description || !amount || !value || !categorie_id) {
            throw new api_error_1.BadRequestError('Todos os campos são obrigatórios');
        }
        const categorie = await categorieRepository_1.categorieRepository.findOneBy({ id: categorie_id });
        if (!categorie) {
            throw new api_error_1.NotFoundError('Categoria não encontrada');
        }
        const product = await productRepository_1.productRepository.findOne({
            where: { id: Number(id) },
            relations: { categorie: true }
        });
        if (!product) {
            throw new api_error_1.NotFoundError('Produto não encontrado');
        }
        const newProduct = productRepository_1.productRepository.create({
            description,
            amount,
            categorie: categorie_id,
            value
        });
        await productRepository_1.productRepository.update(product, newProduct);
        res.status(204).json();
    }
    async delProduct(req, res) {
        const { id } = req.params;
        const product = await productRepository_1.productRepository.findOneBy({ id: Number(id) });
        if (!product) {
            throw new api_error_1.NotFoundError('Produto não encontrado');
        }
        const foundOrder = await orderProductRepositosy_1.orderProductRepository.findOneBy({ product });
        if (foundOrder) {
            throw new api_error_1.BadRequestError('ok');
        }
        await productRepository_1.productRepository.delete(product);
        res.status(200).json({ message: 'Produto deletado com sucesso' });
    }
}
exports.ProductController = ProductController;
