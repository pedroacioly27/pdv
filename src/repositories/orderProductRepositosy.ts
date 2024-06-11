import { AppDataSource } from "../data-source";
import { OrderProduct } from "../entities/OrderProduct";




export const orderProductRepository = AppDataSource.getRepository(OrderProduct)