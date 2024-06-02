import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
}