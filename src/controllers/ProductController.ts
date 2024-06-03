import { Request, Response } from "express";
import { productRepository } from "../repositories/productRepository";
import { BadRequestError, NotFoundError } from "../helpers/api-error";
import { categorieRepository } from "../repositories/categorieRepository";

export class ProductController {

    async create(req: Request, res: Response) {
        const { description, amount, value, categorie_id } = req.body

        if (!description || !amount || !value || !categorie_id) {
            throw new BadRequestError('Todos os campos são obrigatórios')
        }
        const categorie = await categorieRepository.findOneBy({ id: categorie_id })
        if (!categorie) {
            throw new NotFoundError('Categoria não encontrada')
        }
        const newProduct = productRepository.create({
            description,
            amount,
            categorie: categorie_id,
            value
        })
        await productRepository.save(newProduct)

        res.status(201).json(newProduct)
    }

    async getProduct(req: Request, res: Response) {
        const products = await productRepository.find({
            relations: {
                categorie: true
            }
        })
        res.status(200).json(products)
    }

}