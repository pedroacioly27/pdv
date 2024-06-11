import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";




@Entity('order_product')
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount_product: number

    @Column()
    value_product: number

    @ManyToOne(() => Order, order => order.orderProduct)
    @JoinColumn({
        name: 'order_id'
    })
    order: Order

    @ManyToOne(() => Product, product => product.orderProduct)
    @JoinColumn({
        name: 'product_id'
    })
    product: Product


}