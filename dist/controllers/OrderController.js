"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const api_error_1 = require("../helpers/api-error");
const productRepository_1 = require("../repositories/productRepository");
const orderRepository_1 = require("../repositories/orderRepository");
const clientRepository_1 = require("../repositories/clientRepository");
const orderProductRepositosy_1 = require("../repositories/orderProductRepositosy");
class OrderController {
    async create(req, res) {
        const { client_id, observation, products } = req.body;
        if (!client_id) {
            throw new api_error_1.BadRequestError('Necessário informar o id do cliente');
        }
        const client = await clientRepository_1.clientRepository.findOneBy({ id: client_id });
        if (!client) {
            throw new api_error_1.NotFoundError('Cliente não encontrado');
        }
        if (!Array.isArray(products) || !products) {
            throw new api_error_1.BadRequestError('Necessário informar os produtos do pedido');
        }
        if (products.length <= 0) {
            throw new api_error_1.BadRequestError('Necessário informar ao menos um produto para cadastrar o pedido');
        }
        let value = 0;
        let listProducts = [];
        for (const product of products) {
            if (!product.id) {
                throw new api_error_1.BadRequestError('Precisa informar o ID do produto');
            }
            if (product.id !== Number(product.id)) {
                throw new api_error_1.BadRequestError('ID do produto precisa ser um número');
            }
            if (!product.amount) {
                throw new api_error_1.BadRequestError('Precisa informar a quantidade do produto');
            }
            if (product.amount !== Number(product.amount)) {
                throw new api_error_1.BadRequestError('Quantidade do produto precisa ser um número');
            }
            const productFound = await productRepository_1.productRepository.findOneBy({ id: product.id });
            if (!productFound) {
                throw new api_error_1.NotFoundError(`Produto com o id: ${product.id} não encontrado`);
            }
            if (product.amount <= 0) {
                throw new api_error_1.BadRequestError('Quantidade do produto informada no formato errado');
            }
            const { amount } = productFound;
            if (product.amount > amount) {
                throw new api_error_1.BadRequestError(`${productFound.description} sem estoque suficiente`);
            }
            value += productFound.value * product.amount;
        }
        const order = orderRepository_1.orderRepository.create({
            client,
            observation,
            value
        });
        await orderRepository_1.orderRepository.save(order);
        for (const product of products) {
            const productFound = await productRepository_1.productRepository.findOneBy({ id: product.id });
            const newOrderProduct = orderProductRepositosy_1.orderProductRepository.create({
                order,
                product,
                value_product: productFound === null || productFound === void 0 ? void 0 : productFound.value,
                amount_product: product.amount
            });
            if (!productFound) {
                throw new api_error_1.NotFoundError('Produto não encontrado!');
            }
            const newProduct = {
                id: productFound.id,
                product: productFound.description,
                amount: product.amount,
                value_product: `R$ ${(productFound.value / 100).toFixed(2)}`
            };
            await orderProductRepositosy_1.orderProductRepository.save(newOrderProduct);
            listProducts.push(newProduct);
            await productRepository_1.productRepository.update(productFound, { amount: productFound.amount - product.amount });
        }
        return res.status(201).json({
            id: order.id,
            client_id,
            observation,
            value_order: `R$ ${(value / 100).toFixed(2)}`,
            products: listProducts
        });
    }
    async getOrders(req, res) {
        const { client_id } = req.query;
        if (client_id) {
            const clientOrders = [];
            const orders = await orderRepository_1.orderRepository.find({
                relations: {
                    orderProduct: true,
                    client: true
                }
            });
            for (const order of orders) {
                if (order.client.id === Number(client_id)) {
                    const { client: _, ...newOrder } = order;
                    clientOrders.push(newOrder);
                }
            }
            return res.status(200).json(clientOrders);
        }
        const orders = await orderRepository_1.orderRepository.find({
            relations: {
                orderProduct: true
            }
        });
        return res.status(200).json(orders);
    }
}
exports.OrderController = OrderController;
