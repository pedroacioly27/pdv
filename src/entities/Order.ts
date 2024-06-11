import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Client } from "./Client";
import { Product } from "./Product";
import { OrderProduct } from "./OrderProduct";


@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    observation: string

    @Column()
    value: number

    @ManyToOne(() => Client, client => client.orders)
    @JoinColumn({
        name: 'client_id'
    })
    client: Client

    @OneToMany(() => Product, products => products.categorie)
    products: Product[]

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.order)
    orderProduct: OrderProduct[]



    // @ManyToMany(() => Product, products => products.orders)
    // @JoinTable({
    //     name: 'order_product',
    //     joinColumn: {
    //         name: 'order_id',
    //         referencedColumnName: 'id'
    //     },
    //     inverseJoinColumn: {
    //         name: 'product_id',
    //         referencedColumnName: 'id'
    //     }
    // })
    // products: Product[]

}