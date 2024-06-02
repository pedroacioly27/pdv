import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-error";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export class UserController {


    async create(req: Request, res: Response) {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            throw new BadRequestError('Todos os campos são obrigatórios')
        }

        const userExist = await userRepository.findOneBy({ email })

        if (userExist) {
            throw new BadRequestError('Email já cadastrado')
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = userRepository.create({
            name,
            email,
            password: hashPassword
        })
        await userRepository.save(newUser)

        const { password: _, ...user } = newUser


        res.status(201).json(user)

    }


    async login(req: Request, res: Response) {
        const { email, password } = req.body

        const user = await userRepository.findOneBy({ email })

        if (!user) {
            throw new BadRequestError('Email ou senha inválidos')
        }

        const verifyPass = await bcrypt.compare(password, user.password)

        if (!verifyPass) {
            throw new BadRequestError('Email ou senha inválidos')
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '8h' })

        const { password: _, ...userLogin } = user

        return res.status(200).json({ user: userLogin, token })
    }

    async getProfile(req: Request, res: Response) {

        return res.status(200).json(req.user)

    }
}