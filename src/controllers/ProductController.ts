import { Request, Response } from "express";
import { productRepository } from "../repositories/productRepository";
import { BadRequestError, NotFoundError } from "../helpers/api-error";
import { categorieRepository } from "../repositories/categorieRepository";
import { orderProductRepository } from "../repositories/orderProductRepositosy";

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


        res.status(201).json({ ...newProduct })
    }

    async getProduct(req: Request, res: Response) {
        const products = await productRepository.find({
            relations: {
                categorie: true
            }
        })
        res.status(200).json(products)
    }

    async getProductById(req: Request, res: Response) {
        const { id } = req.params

        const product = await productRepository.findOne({
            where: { id: Number(id) },
            relations: { categorie: true }
        })
        if (!product) {
            throw new NotFoundError('Produto não encontrado')
        }

        res.status(200).json(product)
    }

    async putProduct(req: Request, res: Response) {
        const { id } = req.params
        const { description, amount, value, categorie_id } = req.body

        if (!description || !amount || !value || !categorie_id) {
            throw new BadRequestError('Todos os campos são obrigatórios')
        }
        const categorie = await categorieRepository.findOneBy({ id: categorie_id })
        if (!categorie) {
            throw new NotFoundError('Categoria não encontrada')
        }
        const product = await productRepository.findOne({
            where: { id: Number(id) },
            relations: { categorie: true }
        })
        if (!product) {
            throw new NotFoundError('Produto não encontrado')
        }
        const newProduct = productRepository.create({
            description,
            amount,
            categorie: categorie_id,
            value
        })

        await productRepository.update(product, newProduct)

        res.status(204).json()
    }

    async delProduct(req: Request, res: Response) {
        const { id } = req.params

        const product = await productRepository.findOneBy({ id: Number(id) })
        if (!product) {
            throw new NotFoundError('Produto não encontrado')
        }
        const foundOrder = await orderProductRepository.findOneBy({ product })
        if (foundOrder) {
            throw new BadRequestError('ok')
        }

        await productRepository.delete(product)

        res.status(200).json({ message: 'Produto deletado com sucesso' })
    }

}