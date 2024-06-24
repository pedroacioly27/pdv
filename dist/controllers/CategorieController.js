"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorieController = void 0;
const api_error_1 = require("../helpers/api-error");
const categorieRepository_1 = require("../repositories/categorieRepository");
const productRepository_1 = require("../repositories/productRepository");
class CategorieController {
    async create(req, res) {
        const { description } = req.body;
        if (!description) {
            throw new api_error_1.BadRequestError('Precisa informar o nome da categoria');
        }
        const categorieExist = await categorieRepository_1.categorieRepository.findOneBy({ description: description.toLowerCase() });
        if (categorieExist) {
            throw new api_error_1.BadRequestError('Categoria já cadastrada');
        }
        const newCategorie = categorieRepository_1.categorieRepository.create({
            description: description.toLowerCase()
        });
        await categorieRepository_1.categorieRepository.save(newCategorie);
        res.status(201).json(newCategorie);
    }
    async getCategories(req, res) {
        const categories = await categorieRepository_1.categorieRepository.find();
        res.status(200).json(categories);
    }
    async delCategorie(req, res) {
        const { id } = req.params;
        const categorie = await categorieRepository_1.categorieRepository.findOneBy({ id: Number(id) });
        if (!categorie) {
            throw new api_error_1.NotFoundError('Categoria não encontrada');
        }
        const product = await productRepository_1.productRepository.find({ relations: { categorie: true } });
        const productExist = product.find((product) => {
            return product.categorie.id === Number(id);
        });
        if (productExist) {
            throw new api_error_1.BadRequestError('Não é permitido deletar categoria com produto cadastrado');
        }
        await categorieRepository_1.categorieRepository.delete(id);
        res.status(200).json({ message: 'Deletado com sucesso!' });
    }
}
exports.CategorieController = CategorieController;
