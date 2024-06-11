import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "./Order";



@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({ unique: true })
    cpf: string

    @Column()
    cep: string

    @OneToMany(() => Order, orders => orders.client)
    orders: Order[]

}