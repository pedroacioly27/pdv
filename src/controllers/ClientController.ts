import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/api-error";
import { clientRepository } from "../repositories/clientRepository";


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

        const client = clientRepository.create({
            name,
            email,
            cpf,
            cep
        })

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
}