import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categorie } from "./Categorie";
import { Order } from "./Order";
import { OrderProduct } from "./OrderProduct";


@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    amount: number

    @Column()
    value: number

    @ManyToOne(() => Categorie, categorie => categorie.products)
    @JoinColumn({
        name: 'categorie_id'
    })
    categorie: Categorie

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.order)
    orderProduct: OrderProduct[]


    // @ManyToMany(() => Order, orders => orders.products)
    // orders: Order[]


}