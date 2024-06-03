import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/api-error";
import { categorieRepository } from "../repositories/categorieRepository";
import { productRepository } from "../repositories/productRepository";




export class CategorieController {
    async create(req: Request, res: Response) {
        const { description } = req.body
        if (!description) {
            throw new BadRequestError('Precisa informar o nome da categoria')
        }
        const categorieExist = await categorieRepository.findOneBy({ description: description.toLowerCase() })
        if (categorieExist) {
            throw new BadRequestError('Categoria já cadastrada')
        }

        const newCategorie = categorieRepository.create({
            description: description.toLowerCase()
        })

        await categorieRepository.save(newCategorie)

        res.status(201).json(newCategorie)

    }

    async getCategories(req: Request, res: Response) {
        const categories = await categorieRepository.find()
        res.status(200).json(categories)
    }

    async delCategorie(req: Request, res: Response) {
        const { id } = req.params

        const categorie = await categorieRepository.findOneBy({ id: Number(id) })
        if (!categorie) {
            throw new NotFoundError('Categoria não encontrada')
        }
        const product = await productRepository.find({ relations: { categorie: true } })
        const productExist = product.find((product) => {
            return product.categorie.id === Number(id)
        })
        if (productExist) {
            throw new BadRequestError('Não é permitido deletar categoria com produto cadastrado')
        }

        await categorieRepository.delete(id)

        res.status(200).json({ message: 'Deletado com sucesso!' })
    }
}