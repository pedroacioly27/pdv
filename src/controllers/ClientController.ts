import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/api-error";
import { clientRepository } from "../repositories/clientRepository";
import { validate } from "class-validator";


export class ClientController {

    async create(req: Request, res: Response) {
        const { name, email, cpf, cep } = req.body

        if (!name || !email || !cpf || !cep) {
            throw new BadRequestError('Todos os campos são obrigatórios')
        }
        const emailExist = await clientRepository.findOneBy({ email })
        const cpfExist = await clientRepository.findOneBy({ cpf })

        if (emailExist) {
            throw new BadRequestError('Email já cadastrado')
        }
        if (cpfExist) {
            throw new BadRequestError('Cpf já cadastrado')
        }
        if (cpf.length !== 11) {
            throw new BadRequestError('CPF precisa conter 11 dígitos')
        }

        const client = clientRepository.create({
            name,
            email,
            cpf,
            cep
        })

        const errors = await validate(client)

        if (errors.length >= 1) {
            const newErrors = []
            for (const error of errors) {
                newErrors.push(error.constraints)
            }
            return res.status(400).json(newErrors)
        }

        await clientRepository.save(client)

        return res.status(201).json(client)
    }

    async putCliente(req: Request, res: Response) {
        const { name, email, cpf, cep } = req.body
        const { id } = req.params

        if (!name || !email || !cpf || !cep) {
            throw new BadRequestError('Todos os campos são obrigatórios')
        }
        const client = await clientRepository.findOneBy({ id: Number(id) })

        const emailExist = await clientRepository.findOneBy({ email })

        const cpfExist = await clientRepository.findOneBy({ cpf })

        if (!client) {
            throw new NotFoundError('Cliente não encontrado')
        }

        if (emailExist && emailExist.email !== client.email || cpfExist && cpfExist.cpf !== client.cpf) {
            throw new BadRequestError('Cpf ou email já cadastrado!')
        }

        const newClient = {
            name,
            email,
            cpf,
            cep
        }

        await clientRepository.update(client, newClient)


        return res.status(204).json()
    }

    async getClients(req: Request, res: Response) {
        res.status(200).json(await clientRepository.find())
    }

    async getClientsById(req: Request, res: Response) {
        const { id } = req.params
        const client = await clientRepository.findOneBy({ id: Number(id) })
        if (!client) {
            throw new NotFoundError('Cliente não encontrado')
        }
        return res.status(200).json(client)
    }
}