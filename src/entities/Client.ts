import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "./Order";
import { IsEmail, IsNumberString } from "class-validator";



@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    @IsEmail()
    email: string

    @Column({ unique: true })
    @IsNumberString()
    cpf: string

    @Column()
    cep: string

    @OneToMany(() => Order, orders => orders.client)
    orders: Order[]

}