"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const api_error_1 = require("../helpers/api-error");
const clientRepository_1 = require("../repositories/clientRepository");
const class_validator_1 = require("class-validator");
class ClientController {
    async create(req, res) {
        const { name, email, cpf, cep } = req.body;
        if (!name || !email || !cpf || !cep) {
            throw new api_error_1.BadRequestError('Todos os campos são obrigatórios');
        }
        const emailExist = await clientRepository_1.clientRepository.findOneBy({ email });
        const cpfExist = await clientRepository_1.clientRepository.findOneBy({ cpf });
        if (emailExist) {
            throw new api_error_1.BadRequestError('Email já cadastrado');
        }
        if (cpfExist) {
            throw new api_error_1.BadRequestError('Cpf já cadastrado');
        }
        if (cpf.length !== 11) {
            throw new api_error_1.BadRequestError('CPF precisa conter 11 dígitos');
        }
        const client = clientRepository_1.clientRepository.create({
            name,
            email,
            cpf,
            cep
        });
        const errors = await (0, class_validator_1.validate)(client);
        if (errors.length >= 1) {
            const newErrors = [];
            for (const error of errors) {
                newErrors.push(error.constraints);
            }
            return res.status(400).json(newErrors);
        }
        await clientRepository_1.clientRepository.save(client);
        return res.status(201).json(client);
    }
    async putCliente(req, res) {
        const { name, email, cpf, cep } = req.body;
        const { id } = req.params;
        if (!name || !email || !cpf || !cep) {
            throw new api_error_1.BadRequestError('Todos os campos são obrigatórios');
        }
        const client = await clientRepository_1.clientRepository.findOneBy({ id: Number(id) });
        const emailExist = await clientRepository_1.clientRepository.findOneBy({ email });
        const cpfExist = await clientRepository_1.clientRepository.findOneBy({ cpf });
        if (!client) {
            throw new api_error_1.NotFoundError('Cliente não encontrado');
        }
        if (emailExist && emailExist.email !== client.email || cpfExist && cpfExist.cpf !== client.cpf) {
            throw new api_error_1.BadRequestError('Cpf ou email já cadastrado!');
        }
        const newClient = {
            name,
            email,
            cpf,
            cep
        };
        await clientRepository_1.clientRepository.update(client, newClient);
        return res.status(204).json();
    }
    async getClients(req, res) {
        res.status(200).json(await clientRepository_1.clientRepository.find());
    }
    async getClientsById(req, res) {
        const { id } = req.params;
        const client = await clientRepository_1.clientRepository.findOneBy({ id: Number(id) });
        if (!client) {
            throw new api_error_1.NotFoundError('Cliente não encontrado');
        }
        return res.status(200).json(client);
    }
}
exports.ClientController = ClientController;
