import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { IsEmail } from "class-validator"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    @IsEmail()
    email: string

    @Column()
    password: string

}



