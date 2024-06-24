import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/api-error";
import { productRepository } from "../repositories/productRepository";
import { orderRepository } from "../repositories/orderRepository";
import { clientRepository } from "../repositories/clientRepository";
import { orderProductRepository } from "../repositories/orderProductRepositosy";


export class OrderController {
    async create(req: Request, res: Response) {
        const { client_id, observation, products } = req.body



        if (!client_id) {
            throw new BadRequestError('Necessário informar o id do cliente')
        }

        const client = await clientRepository.findOneBy({ id: client_id })

        if (!client) {
            throw new NotFoundError('Cliente não encontrado')
        }

        if (!Array.isArray(products) || !products) {
            throw new BadRequestError('Necessário informar os produtos do pedido')
        }

        if (products.length <= 0) {
            throw new BadRequestError('Necessário informar ao menos um produto para cadastrar o pedido')
        }

        let value = 0
        let listProducts = []

        for (const product of products) {

            if (!product.id) {
                throw new BadRequestError('Precisa informar o ID do produto')
            }
            if (product.id !== Number(product.id)) {
                throw new BadRequestError('ID do produto precisa ser um número')
            }
            if (!product.amount) {
                throw new BadRequestError('Precisa informar a quantidade do produto')
            }
            if (product.amount !== Number(product.amount)) {
                throw new BadRequestError('Quantidade do produto precisa ser um número')
            }
            const productFound = await productRepository.findOneBy({ id: product.id })
            if (!productFound) {
                throw new NotFoundError(`Produto com o id: ${product.id} não encontrado`)
            }
            if (product.amount <= 0) {
                throw new BadRequestError('Quantidade do produto informada no formato errado')
            }
            const { amount } = productFound

            if (product.amount > amount) {
                throw new BadRequestError(`${productFound.description} sem estoque suficiente`)
            }

            value += productFound.value * product.amount
        }

        const order = orderRepository.create({
            client,
            observation,
            value
        })

        await orderRepository.save(order)

        for (const product of products) {
            const productFound = await productRepository.findOneBy({ id: product.id })
            const newOrderProduct = orderProductRepository.create({
                order,
                product,
                value_product: productFound?.value,
                amount_product: product.amount
            })
            if (!productFound) {
                throw new NotFoundError('Produto não encontrado!')
            }
            const newProduct = {
                id: productFound.id,
                product: productFound.description,
                amount: product.amount,
                value_product: `R$ ${(productFound.value / 100).toFixed(2)}`

            }
            await orderProductRepository.save(newOrderProduct)

            listProducts.push(newProduct)

            await productRepository.update(productFound, { amount: productFound.amount - product.amount })
        }

        return res.status(201).json({
            id: order.id,
            client_id,
            observation,
            value_order: `R$ ${(value / 100).toFixed(2)}`,
            products: listProducts
        })
    }

    async getOrders(req: Request, res: Response) {
        const { client_id } = req.query
        if (client_id) {
            const clientOrders = []
            const orders = await orderRepository.find({
                relations: {
                    orderProduct: true,
                    client: true
                }
            })
            for (const order of orders) {
                if (order.client.id === Number(client_id)) {
                    const { client: _, ...newOrder } = order
                    clientOrders.push(newOrder)
                }
            }
            return res.status(200).json(clientOrders)
        }

        const orders = await orderRepository.find({
            relations: {
                orderProduct: true
            }
        })
        return res.status(200).json(orders)

    }

}