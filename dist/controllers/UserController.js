"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userRepository_1 = require("../repositories/userRepository");
const api_error_1 = require("../helpers/api-error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const class_validator_1 = require("class-validator");
class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new api_error_1.BadRequestError('Todos os campos são obrigatórios');
        }
        if (password.length < 5) {
            throw new api_error_1.BadRequestError('Senha precisa ter no mínimo 5 caracteres');
        }
        const userExist = await userRepository_1.userRepository.findOneBy({ email });
        if (userExist) {
            throw new api_error_1.BadRequestError('Email já cadastrado');
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = userRepository_1.userRepository.create({
            name,
            email,
            password: hashPassword
        });
        const errors = await (0, class_validator_1.validate)(newUser);
        if (errors.length >= 1) {
            const newErrors = [];
            for (const error of errors) {
                newErrors.push(error.constraints);
            }
            return res.status(400).json(newErrors);
        }
        await userRepository_1.userRepository.save(newUser);
        const { password: _, ...user } = newUser;
        return res.status(201).json(user);
    }
    async login(req, res) {
        var _a;
        const { email, password } = req.body;
        const user = await userRepository_1.userRepository.findOneBy({ email });
        if (!user) {
            throw new api_error_1.BadRequestError('Email ou senha inválidos');
        }
        const verifyPass = await bcrypt_1.default.compare(password, user.password);
        if (!verifyPass) {
            throw new api_error_1.BadRequestError('Email ou senha inválidos');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', { expiresIn: '8h' });
        const { password: _, ...userLogin } = user;
        return res.status(200).json({ user: userLogin, token });
    }
    async getProfile(req, res) {
        return res.status(200).json(req.user);
    }
    async putUser(req, res) {
        const { name, email, password } = req.body;
        const { id } = req.body;
        if (!name || !email || !password) {
            throw new api_error_1.BadRequestError('Todos os campos são obrigatórios');
        }
        const userExist = await userRepository_1.userRepository.findOneBy({ id });
        const emailExist = await userRepository_1.userRepository.findOneBy({ email });
        if (!userExist) {
            throw new api_error_1.NotFoundError('Usuário não encontrado');
        }
        if (emailExist && email !== userExist.email) {
            throw new api_error_1.BadRequestError('Email já cadastrado');
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const putUser = userRepository_1.userRepository.create({
            name,
            email,
            password: hashPassword
        });
        await userRepository_1.userRepository.update(userExist, putUser);
        const { password: _, ...user } = putUser;
        res.status(204).json();
    }
}
exports.UserController = UserController;
