import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('categories')
export class Categorie {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    description: string
}