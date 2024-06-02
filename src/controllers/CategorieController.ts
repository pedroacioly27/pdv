import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-error";
import { categorieRepository } from "../repositories/categorieRepository";




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
}